import { useNavigate } from "react-router-dom";
import { getUser, TeamType } from "../../context/UserContext";
import { getTeams } from "../../context/TeamContext";

interface TeamProps {
  team: TeamType;
  teamType: string;
}

export default function Team({ team, teamType }: TeamProps) {
  const teamId = team.id;
  const { user, setUser } = getUser();
  const userId = user.id;
  const { setUserTeam } = getTeams();
  const navigate = useNavigate();

  const onHandleJoin = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_URL_BACKEND}/team/join`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, teamId }),
      }
    );
    if (response.status === 200) {
      setUser({ ...user, teamId });
    }
    navigate("/dashboard");
  };

  const onHandleLeave = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_URL_BACKEND}/team/join`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, teamId }),
      }
    );
    if (response.ok) {
      setUser({ ...user, teamId: null });
    }
  };

  const onHandleDelete = async () => {
    const response = await fetch(`${import.meta.env.VITE_URL_BACKEND}/team`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ teamId }),
    });
    if (response.ok) {
      setUser({ ...user, teamId: null });
    }
  };

  const onHandleView = () => {
    setUserTeam(team);
    navigate("../../dashboard/view");
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        {/* Team Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">{team.teamname}</h2>
            <p className="text-sm text-gray-500">
              Led by <span className="font-medium">{team.leaderName}</span>
            </p>
          </div>
          <div className="flex items-center space-x-1">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {team.members?.length || 0}/{team.teamsize}
            </span>
          </div>
        </div>

        {/* Team Description */}
        <p className="text-gray-600 mb-4 line-clamp-3">{team.teamDescription}</p>

        {/* GitHub Link */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          {team.githubLink ? (
            <a 
              href={team.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 truncate"
            >
              {team.githubLink.replace(/^https?:\/\/(www\.)?/, '')}
            </a>
          ) : (
            <span className="text-gray-400 italic">No GitHub link provided</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
          {teamType === "user" ? (
            <>
              <button
                onClick={onHandleView}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                View Details
              </button>
              {user.id !== team.teamLeader && (
                <button
                  onClick={onHandleLeave}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Leave Team
                </button>
              )}
              {team.teamLeader === user.id && (
                <button
                  onClick={onHandleDelete}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete Team
                </button>
              )}
            </>
          ) : (
            <>
            <button
                onClick={onHandleView}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                View Details
            </button>
            <button
              onClick={onHandleJoin}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Join Team
            </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
