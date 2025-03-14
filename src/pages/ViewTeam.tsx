import { useNavigate } from "react-router-dom";
import { getTeams } from "../context/TeamContext";
import { useEffect, useState } from "react";

interface TeamMember {
  id: number;
  username: string;
}

export const ViewTeam = () => {
  const { userTeam } = getTeams();
  const navigate = useNavigate();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      if (!userTeam?.id) return;
      
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_URL_BACKEND}/team/${userTeam.id}`);
        if (!response.ok) throw new Error('Failed to fetch team members');
        
        const data = await response.json();
        setMembers(data.members);
      } catch (error) {
        console.error('Error fetching team members:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [userTeam?.id]);

  const handleBack = () => {
    navigate("../");
  };

  const handleMemberClick = (memberId: number) => {
    // Store the current team view state
    sessionStorage.setItem('lastTeamView', JSON.stringify({
      teamId: userTeam?.id,
      teamName: userTeam?.teamname
    }));
    navigate(`/dashboard/profile/${memberId}`);
  };

  if (!userTeam) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-2xl font-bold">No team selected</h1>
        <button
          onClick={handleBack}
          className="mt-4 px-6 py-2 bg-stone-800 text-white rounded-lg hover:bg-stone-700"
        >
          Back to Teams
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="mb-6 px-6 py-2 bg-stone-800 text-white rounded-lg hover:bg-stone-700"
      >
        Back to Teams
      </button>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        {/* Team Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{userTeam.teamname}</h1>
            <p className="text-gray-600">
              Led by <span className="font-semibold">{userTeam.leaderName}</span>
            </p>
          </div>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Team Size</h2>
            <p className="text-gray-700">
              {members.length} / {userTeam.teamsize} members
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">GitHub Repository</h2>
            <a
              href={userTeam.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 break-all"
            >
              {userTeam.githubLink}
            </a>
          </div>
        </div>

        {/* Team Description */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Description</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{userTeam.teamDescription}</p>
        </div>

        {/* Team Details */}
        {userTeam.details && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Additional Details</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{userTeam.details}</p>
          </div>
        )}

        {/* Team Members */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Team Members</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            {loading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-stone-800"></div>
              </div>
            ) : members.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* Leader */}
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-stone-800 rounded-full flex items-center justify-center text-white">
                    {userTeam.leaderName?.[0]?.toUpperCase()}
                  </div>
                  <button
                    onClick={() => handleMemberClick(userTeam.teamLeader!)}
                    className="font-medium hover:text-blue-600 transition-colors"
                  >
                    {userTeam.leaderName} (Leader)
                  </button>
                </div>
                
                {/* Other Members */}
                {members.map((member) => (
                  member.username !== userTeam.leaderName && (
                    <div key={member.id} className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                        {member.username[0]?.toUpperCase()}
                      </div>
                      <button
                        onClick={() => handleMemberClick(member.id)}
                        className="font-medium hover:text-blue-600 transition-colors"
                      >
                        {member.username}
                      </button>
                    </div>
                  )
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No members found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
