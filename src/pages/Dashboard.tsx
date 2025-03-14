import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getUser } from "../context/UserContext";

export const Dashboard = () => {
  const navigate = useNavigate();
  const { verifyCookie, user, setUserTeams, setUser } = getUser();

  useEffect(() => {
    verifyCookie();
  }, [navigate]);

  const handleOnClick = () => {
    localStorage.removeItem("token");
    setUser({ username: "", email: "", teamId: null });
    setUserTeams([]);
    navigate("../");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                FlexSkill
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, <span className="font-medium text-gray-900">{user.username}</span>
              </span>
              <button
                onClick={handleOnClick}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-md mt-8">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © 2024 FlexSkill. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
