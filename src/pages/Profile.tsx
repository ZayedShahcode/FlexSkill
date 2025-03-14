import { getUser } from "../context/UserContext";
import { getTeams } from "../context/TeamContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface ViewedUser {
  id: number;
  username: string;
  email: string;
  teamId: number | null;
  githubProfile: string | null;
}

export const Profile = () => {
  const { user } = getUser();
  const { userTeam, setUserTeam } = getTeams();
  const navigate = useNavigate();
  const { userId } = useParams();
  const [viewedUser, setViewedUser] = useState<ViewedUser | null>(null);
  const [viewedUserTeam, setViewedUserTeam] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;
      
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_URL_BACKEND}/sign/user/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch user');
        
        const data = await response.json();
        setViewedUser(data.user);

        if (data.user.teamId) {
          const teamResponse = await fetch(`${import.meta.env.VITE_URL_BACKEND}/dash/${data.user.teamId}`);
          if (teamResponse.ok) {
            const teamData = await teamResponse.json();
            if (teamData.userTeam && teamData.userTeam.length > 0) {
              setViewedUserTeam(teamData.userTeam[0]);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCurrentUserTeam = async () => {
      if (!user.teamId) {
        setUserTeam(null);
        return;
      }
      
      try {
        const response = await fetch(`${import.meta.env.VITE_URL_BACKEND}/dash/${user.teamId}`);
        if (!response.ok) throw new Error('Failed to fetch team');
        
        const data = await response.json();
        if (data.userTeam && data.userTeam.length > 0) {
          setUserTeam(data.userTeam[0]);
        }
      } catch (error) {
        console.error('Error fetching team:', error);
      }
    };

    if (userId) {
      fetchUserData();
    } else {
      fetchCurrentUserTeam();
    }
  }, [userId, user.teamId, setUserTeam]);

  const handleTeamClick = () => {
    if (userId) {
      if (viewedUserTeam) {
        navigate("/dashboard/view", { state: { teamId: viewedUserTeam.id } });
      }
    } else if (userTeam) {
      navigate("/dashboard/view");
    }
  };

  const handleBack = () => {
    const lastTeamView = sessionStorage.getItem('lastTeamView');
    if (lastTeamView) {
      const { teamId } = JSON.parse(lastTeamView);
      sessionStorage.removeItem('lastTeamView');
      navigate("/dashboard/view", { state: { teamId } });
    } else {
      navigate("/dashboard");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-800"></div>
      </div>
    );
  }

  const displayedUser = userId ? viewedUser : user;
  const displayedTeam = userId ? viewedUserTeam : userTeam;

  if (!displayedUser) return null;

  return (
    <div className="p-6">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="mb-6 px-6 py-2 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition-colors flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back
      </button>

      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        {/* Profile Header */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-16 h-16 bg-stone-800 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {displayedUser.username[0].toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{displayedUser.username}</h1>
            <p className="text-gray-600">{displayedUser.email}</p>
          </div>
        </div>

        {/* Profile Details */}
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-xl font-semibold mb-4">Account Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Username</label>
                <p className="text-gray-900">{displayedUser.username}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                <p className="text-gray-900">{displayedUser.email}</p>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-500 mb-1">GitHub Profile</label>
                {displayedUser.githubProfile ? (
                  <a
                    href={displayedUser.githubProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    {displayedUser.githubProfile}
                  </a>
                ) : (
                  <p className="text-gray-500 italic">No GitHub profile linked</p>
                )}
              </div>
            </div>
          </div>

          {/* Team Status */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Team Status</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              {displayedTeam ? (
                <p className="text-gray-900">
                  Currently a member of team{" "}
                  <button
                    onClick={handleTeamClick}
                    className="font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    {displayedTeam.teamname}
                  </button>
                </p>
              ) : (
                <p className="text-gray-600">Not currently a member of any team</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 