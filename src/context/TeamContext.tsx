import { createContext, ReactNode, useContext, useState } from "react";
import { TeamType } from "./UserContext";

interface teamContextType {
  userTeam: TeamType | null;
  setUserTeam: React.Dispatch<React.SetStateAction<TeamType | null>>;
  allTeams: Array<TeamType>;
  setAllTeams: React.Dispatch<React.SetStateAction<Array<TeamType>>>;
  fetchAllTeams: () => Promise<void>;
}

const TeamContext = createContext<teamContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export function TeamProvider({ children }: UserProviderProps) {
  const [allTeams, setAllTeams] = useState<TeamType[]>([]);
  const [userTeam,setUserTeam] = useState<TeamType | null>(null);

  const fetchAllTeams = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL_BACKEND}/team`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch teams");
      }

      const data = await response.json();

      setAllTeams(data.teams);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const contextData: teamContextType = {
    userTeam,
    setUserTeam,
    allTeams,
    setAllTeams,
    fetchAllTeams,
  };
  return (
    <TeamContext.Provider value={contextData}>{children}</TeamContext.Provider>
  );
}

export function getTeams() {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error("Cannot fetch team Details");
  }
  return context;
}
