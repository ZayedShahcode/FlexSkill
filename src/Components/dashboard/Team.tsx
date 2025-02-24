
import { useNavigate } from "react-router-dom";
import {  getUser, TeamType } from "../../context/UserContext"

interface TeamProps{
    team: TeamType;
    teamType: string;
}
export default function Team({team,teamType}:TeamProps){
    
    const teamId = team.id;
    const {user,setUser} = getUser();
    const userId = user.id;
    const navigate = useNavigate()

    const onHandleJoin = async ()=>{
        const response =  await fetch(`${import.meta.env.VITE_URL_BACKEND}/team/join`,{
            method:"PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({userId,teamId}),
        })
        if(response.status===200){
            setUser({...user,teamId})
        }
        navigate("/dashboard")
    }

    const onHandleLeave = async()=>{
        const response = await fetch(`${import.meta.env.VITE_URL_BACKEND}/team/join`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({userId})
        })
        if(response.ok){
            setUser({...user,teamId:null})
            console.log(user)
        }
    }
    
    return(
        <div className="border border-gray-500  w-48 h-64 p-4">
            <h1 className="text-xl font-bold">{team.teamname}</h1>
            <p>{team.teamsize}</p>
           {teamType==='user'?
           <div>
           <button >View</button>
           <br />
           <button onClick={onHandleLeave}>Leave</button>
           </div>:
           <button onClick={onHandleJoin}>Join</button>
            }
        </div>
    )
}