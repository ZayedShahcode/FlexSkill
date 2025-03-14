import { useEffect } from "react";
import { getTeams } from "../../context/TeamContext";
import { getUser } from "../../context/UserContext";
import Team from "./Team";
import { useNavigate } from "react-router-dom";

export const AllTeams = () => {
  const { user } = getUser();
  const { allTeams, fetchAllTeams } = getTeams();
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchAllTeams();
  }, [user]);

  const filteredTeams = allTeams.filter((team) => team.id !== user.teamId);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Available Teams</h1>
          <button
            onClick={() => navigate("../")}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeams.length === 0 ? (
            <div className="col-span-full">
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No teams available</h3>
                <p className="mt-1 text-sm text-gray-500">
                  There are currently no teams available to join.
                </p>
              </div>
            </div>
          ) : (
            filteredTeams.map((team) => (
              <Team key={team.id} team={team} teamType="all" />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
