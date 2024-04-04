import React, { useEffect, useState } from "react";
import { axiosClient } from "../utils/axiosClient";
import { useNavigate } from "react-router-dom";

function Teams() {
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTeams() {
      try {
        const response = await axiosClient.get("api/team");
        setTeams(response.data.result);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTeams();
  }, []);

  return (
    <div className="h-screen overflow-scroll hideScrollbar">
      {teams.length == 0 ? (
        <p className="text-center text-white text-2xl">
          No teams available
        </p>
      ) : (
        teams.map((team) => (
          <div className="flex justify-center">
            <div
              key={team._id}
              className="bg-cyan-700 p-5 text-white rounded font-medium my-10 cursor-pointer shadow-2xl "
              onClick={() => navigate(`/aboutTeam/${team._id}`)}
            >
              <p className="text-xl font-bold">{team.name}</p>
              <p className="my-3">Team Members: </p>
              <ul>
                {team.users.map((member, idx) => (
                  <li key={idx}>
                    {member.first_name} {member.last_name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Teams;
