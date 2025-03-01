import { useNavigate } from "react-router-dom";
import { getUser, TeamType } from "../../context/UserContext";
import { Button } from "./Button";

interface TeamProps {
  team: TeamType;
  teamType: string;
}
export default function Team({ team, teamType }: TeamProps) {
  const teamId = team.id;
  const { user, setUser } = getUser();
  const userId = user.id;
  const navigate = useNavigate();

  const onHandleJoin = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_URL_BACKEND}/team/join`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, teamId }),
      }
    );
    if (response.status === 200) {
      setUser({ ...user, teamId });
    }
    navigate("/dashboard");
  };

  const onHandleLeave = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_URL_BACKEND}/team/join`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId ,teamId}),
      }
    );
    console.log(await response.json())
    if (response.ok) {
      setUser({ ...user, teamId: null });
    }
  };

  const onHandleDelete = async ()=>{
    const response = await fetch(`${import.meta.env.VITE_URL_BACKEND}/team`,{
      method:"DELETE",
      headers:{
        "Content-Type" : "application/json"
      },
      body:JSON.stringify({teamId}),
    })
    if(response.ok){
      setUser({...user,teamId:null})
    }
  }

  const onHandleView = ()=>{
    console.log("View");
  }

  return (
    <div className="border border-gray-500 flex flex-col justify-between w-96 h-64 p-4">
      <div className="flex flex-col gap-4" >
      <h1 className="text-xl font-bold">{team.teamname}</h1>
      <p><b>Size</b> : {team.members?.length} <span>(max: {team.teamsize}) </span></p>
      {teamType==="user"?<p ><b>Leader</b>: {team.teamLeader}</p>:<></>}
      <p><b>About</b>: {team.teamDescription}</p>
      </div>
      <div className="flex gap-4 justify-around ">
      {teamType === "user" ? (
        <>
          <Button onHandleClick={onHandleView} btncolor="green" >View</Button>
          <br />
          <Button onHandleClick={onHandleLeave} btncolor="blue">Leave</Button>
          <br />
          {team.teamLeader == user.username? (
           <Button onHandleClick={onHandleDelete} btncolor="red">Delete</Button>
          ):<></>}
          </>
      ) : (
        <Button onHandleClick={onHandleJoin} btncolor="green">Join</Button>
      )}
      </div>
    </div>
  );
}
