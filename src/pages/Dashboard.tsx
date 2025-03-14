import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getUser } from "../context/UserContext";
import { ProfileDropdown } from "../Components/dashboard/ProfileDropdown";

export const Dashboard = () => {
  const navigate = useNavigate();
  const { verifyCookie } = getUser();

  useEffect(() => {
    verifyCookie();
  }, [navigate]);

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
              <ProfileDropdown />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer>
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © 2024 FlexSkill. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
