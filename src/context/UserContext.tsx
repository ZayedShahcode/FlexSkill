import { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id?: number;
  username: string;
  email: string;
  teamId?: number | null;
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
}

export interface TeamType {
  id?: number;
  teamname: string;
  teamsize: number;
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
    const response = await fetch("http://localhost:3000/sign/verify", {
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
      const response = await fetch(`http://localhost:3000/dash/${teamId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch teams");
      }
      const data = await response.json();
      setUserTeams(data.team);
    } catch (error) {
      console.error("Error fetching teams:", error);
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
