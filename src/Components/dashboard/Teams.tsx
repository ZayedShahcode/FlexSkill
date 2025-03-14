import { useEffect, useState } from "react";
import Team from "./Team";
import { Link } from "react-router-dom";
import { getUser } from "../../context/UserContext";

export default function Teams() {
  const { user, userTeams, fetchUserTeams } = getUser();
  const [loading, setLoading] = useState(false);
  const teamId = user?.teamId;

  useEffect(() => {
    setLoading(true);
    fetchUserTeams();
    setLoading(false);
  }, [teamId]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Your Teams</h1>
            {userTeams.length === 0 && (
              <div className="flex gap-4">
                <Link to="./join">
                  <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
                    Join Team
                  </button>
                </Link>
                <Link to="./create">
                  <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200">
                    Create Team
                  </button>
                </Link>
              </div>
            )}
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userTeams.length === 0 ? (
                <div className="col-span-full">
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No teams yet</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Get started by creating a new team or joining an existing one.
                    </p>
                  </div>
                </div>
              ) : (
                userTeams.map((team) => (
                  <Team key={team.id} team={team} teamType="user" />
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
