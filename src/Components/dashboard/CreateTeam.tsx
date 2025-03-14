import { useState } from "react";
import { getUser, TeamType } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export const CreateTeam = () => {
  const [teamName, setTeamName] = useState<string>("");
  const [teamSize, setTeamSize] = useState<number>(2);
  const [teamDescription, setTeamDescription] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [githubLink, setGithubLink] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = getUser();
  const navigate = useNavigate();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "teamName") {
      setTeamName(value);
    } else if (name === "teamSize") {
      setTeamSize(Number(value));
    } else if (name === "teamDescription") {
      setTeamDescription(value);
    } else if (name === "details") {
      setDetails(value);
    } else if (name === "githubLink") {
      setGithubLink(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const teamData: TeamType = {
      teamname: teamName,
      teamsize: teamSize,
      teamDescription,
      details,
      githubLink,
    };
    
    try {
      const response = await fetch(`${import.meta.env.VITE_URL_BACKEND}/team/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...teamData, userId: user.id, username: user.username }),
      });

      if (!response.ok) throw new Error("Failed to create team");

      const data = await response.json();
      const teamId = data.newTeam.id;

      const innerResponse = await fetch(`${import.meta.env.VITE_URL_BACKEND}/team/join`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, teamId }),
      });

      if (!innerResponse.ok) throw new Error("Failed to join team");

      setTeamName("");
      setTeamSize(2);
      setTeamDescription("");
      setDetails("");
      setGithubLink("");
      navigate("../");

    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("../")}
        className="mb-6 px-6 py-2 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition-colors"
        disabled={loading}
      >
        Back to Dashboard
      </button>

      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Create Your Team</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Team Name
            </label>
            <input
              type="text"
              name="teamName"
              placeholder="Enter a unique team name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              value={teamName}
              onChange={handleOnChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Team Size
            </label>
            <input
              type="number"
              name="teamSize"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              value={teamSize}
              onChange={handleOnChange}
              min={2}
              required
            />
            <p className="mt-1 text-sm text-gray-500">Minimum team size is 2 members</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="teamDescription"
              placeholder="What is your team's main focus or project?"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors min-h-[100px] resize-y"
              value={teamDescription}
              onChange={handleOnChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Details
            </label>
            <textarea
              name="details"
              placeholder="Any specific requirements, tech stack, or other important information?"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors min-h-[100px] resize-y"
              value={details}
              onChange={handleOnChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              GitHub Repository
            </label>
            <input
              type="url"
              name="githubLink"
              placeholder="https://github.com/username/repository"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              value={githubLink}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Team...
                </span>
              ) : (
                "Create Team"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
