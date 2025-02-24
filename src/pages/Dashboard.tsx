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
    <div>
      <nav className="min-h-[12vh] pt-3 px-2">
        <main className="h-full flex items-center justify-between px-4 bg-[#F8F8FF] border border-black rounded-3xl">
          <h1 className="text-4xl md:text-5xl md:tracking-wider leading-10 pl-8">
            Flex Skill
          </h1>
          <button
            className="text-white bg-stone-800 font-semibold rounded-lg w-16 h-8"
            onClick={handleOnClick}
          >
            Logout
          </button>
        </main>
      </nav>
      <h1 className="text-3xl m-4">Hey! {user.username}</h1>
      <Outlet />
    </div>
  );
};
