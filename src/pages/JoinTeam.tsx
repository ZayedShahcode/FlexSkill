import { useEffect } from "react";
import { AllTeams } from "../Components/dashboard/AllTeams";
import { useNavigate } from "react-router-dom";
import { getUser } from "../context/UserContext";

const JoinTeam = () => {
  const navigate = useNavigate();
  const { user, verifyCookie } = getUser();

  useEffect(() => {
    verifyCookie();
  }, [navigate]);

  return (
    <>
      <div>JoinTeam</div>
      <AllTeams></AllTeams>
    </>
  );
};

export default JoinTeam;
