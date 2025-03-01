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
  const filteredTeams = allTeams.filter((team) => team.id != user.teamId);
  return (
    <>
      <button
        className="text-white bg-stone-800 font-semibold rounded-lg w-16 h-8 ml-4 mt-2"
        onClick={() => navigate("../")}
      >
        Back
      </button>
      <div className="flex gap-4 justify-around flex-wrap my-4">
        {filteredTeams.map((team) => (
          <Team key={team.id} team={team} teamType="all" />
        ))}
      </div>
    </>
  );
};
