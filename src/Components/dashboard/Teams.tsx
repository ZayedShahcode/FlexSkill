import { useEffect } from "react";
import Team from "./Team";
import { Link } from "react-router-dom";
import { getUser } from "../../context/UserContext";

export default function Teams() {
  const { user, userTeams, fetchUserTeams } = getUser();
  const teamId = user?.teamId;

  useEffect(() => {
      fetchUserTeams();
    
  }, [teamId]);

  return (
    <div>
      <div className="border border-stone-800 h-auto m-4">
        <div className="flex items-center justify-between m-2">
          <h1 className="text-2xl m-2 font-bold">Your Teams</h1>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-8 m-2">
          {userTeams.length === 0 ? (
            <>
              <Link to="./join">
                <button className="h-full bg-gray-800 border text-white font-semibold hover:bg-white hover:text-black hover:border-stone-900 rounded-lg w-20 h-6 md:w-28 md:h-8 grid place-items-center md:text-xl">
                  Join Team
                </button>
              </Link>
             
              <Link to="./create">
                <button className="h-full bg-gray-800 border text-white font-semibold hover:bg-white hover:text-black hover:border-stone-900 rounded-lg w-20 h-6 md:w-28 md:h-8 grid place-items-center md:text-xl">
                  Create
                </button>
              </Link>
             
            </>
          ) : (
            userTeams.map((team) => (
              <Team key={team.id} team={team} teamType={"user"} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
