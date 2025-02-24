import { useState } from "react";
import { getUser, TeamType } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export const CreateTeam = () => {
  const [teamName, setTeamName] = useState<string>("");
  const [teamSize, setTeamSize] = useState<number>(2);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = getUser();
  const navigate = useNavigate();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "teamName") {
      setTeamName(value);
    } else if (name === "teamSize") {
      setTeamSize(Number(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const teamData: TeamType = { teamname: teamName, teamsize: teamSize };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL_BACKEND}/team/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(teamData),
        }
      );

      if (response.ok) {
        const userId = user.id;
        const data = await response.json();
        console.log(data.newteam);
        const teamId = data.newteam.id;
        const innerResponse = await fetch(
          `${import.meta.env.VITE_URL_BACKEND}/team/join`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId, teamId }),
          }
        );
        if (innerResponse.ok) {
          console.log("Created Team:", teamData);
          setTeamName("");
          setTeamSize(2);
          navigate("../");
        }
      } else {
        console.log("Unable to Create Team");
      }
    } catch (error) {
      console.error("Error creating team:", error);
    }

    setLoading(false);
  };

  return (
    <>
      <button
        className="text-white bg-stone-800 font-semibold rounded-lg w-16 h-8 ml-4 mt-2"
        disabled={loading}
        onClick={() => navigate("../")}
      >
        Back
      </button>
      <div className="grid place-items-center mt-6">
        <form
          onSubmit={handleSubmit}
          className="w-72 border border-black flex flex-col gap-6 items-center justify-around p-4"
        >
          <h1 className="text-3xl mb-8">Create Your Team</h1>
          <input
            type="text"
            name="teamName"
            placeholder="Team Name"
            className="w-64 h-10 p-2 border border-black"
            value={teamName}
            onChange={handleOnChange}
            required
          />
          <input
            type="number"
            name="teamSize"
            placeholder="Team Size"
            className="w-64 h-10 p-2 border border-black"
            value={teamSize}
            onChange={handleOnChange}
            min={2}
            required
          />
          <button
            type="submit"
            className="h-full bg-gray-800 border text-white font-semibold hover:bg-white hover:text-black hover:border-stone-900 rounded-lg w-20 h-6 md:w-28 md:h-8 grid place-items-center md:text-xl"
            disabled={loading}
          >
            {loading ? "Loading..." : "Create"}
          </button>
        </form>
      </div>
    </>
  );
};
