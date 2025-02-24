import { useEffect } from "react";
import { getTeams } from "../../context/TeamContext";
import { getUser } from "../../context/UserContext";
import Team from "./Team";

export const AllTeams = () => {
    const {user} = getUser();
    const {allTeams,fetchAllTeams} = getTeams();
    useEffect(()=>{
        fetchAllTeams();
    },[user])
    const filteredTeams = allTeams.filter((team)=>team.id!=user.teamId);
    return (
        <>
            <div>AllTeams</div>
            <div className="flex gap-4 justify-around flex-wrap my-4">
                {filteredTeams.map((team) => (
                    <Team key={team.id} team={team} teamType="all" />
                ))}
            </div>
        </>
    );
};
