import { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id?: number;
  username: string;
  email: string;
  teamId?: number | null;
  githubProfile?: string;
}
interface UserContextType {
  username: string;
  email: string;
  password: string;
  teamId?: number | null;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setTeamId: React.Dispatch<React.SetStateAction<number | null>>;
  verifyCookie: () => Promise<void>;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  userTeams: TeamType[];
  setUserTeams: React.Dispatch<React.SetStateAction<TeamType[]>>;
  fetchUserTeams: () => Promise<void>;
  logout: () => Promise<void>;
}

export interface TeamType {
  id?: number;
  teamname: string;
  teamsize: number;
  teamDescription: string;
  teamLeader ?: number;
  leaderName ?: string;
  githubLink : string;
  details ?: string;
  members ?: Array<number>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [teamId, setTeamId] = useState<number | null>(null);
  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    teamId: null,
  });
  const [userTeams, setUserTeams] = useState<TeamType[]>([]);
  const navigate = useNavigate();

  const verifyCookie = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please Login");
      navigate("/login");
    }
    const response = await fetch(`${import.meta.env.VITE_URL_BACKEND}/sign/verify`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      alert("Please login");
      navigate("/login");
    }
    const data = await response.json();
    const { user } = data;
    // console.log(user);
    setUser(user);
  };

  const fetchUserTeams = async () => {
    try {
      const teamId = user.teamId;
      if (!teamId) {
        setUserTeams([]);
        return;
      }
      const response = await fetch(`${import.meta.env.VITE_URL_BACKEND}/dash/${teamId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch teams");
      }
      const data = await response.json();
      setUserTeams(data.userTeam);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL_BACKEND}/sign/logout`, {
        method: "POST",
        credentials: "include",
      });
      
      if (response.ok) {
        localStorage.removeItem("token");
        setUser({ username: "", email: "", teamId: null });
        setUsername("");
        setEmail("");
        setPassword("");
        setTeamId(null);
        setUserTeams([]);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const contextData: UserContextType = {
    username,
    email,
    password,
    teamId,
    setTeamId,
    setUsername,
    setEmail,
    setPassword,
    verifyCookie,
    user,
    setUser,
    userTeams,
    setUserTeams,
    fetchUserTeams,
    logout,
  };
  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
  );
}

export function getUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Cannot fetch User Details");
  }
  return context;
}
