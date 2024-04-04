import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosClient } from "../utils/axiosClient";

function AboutTeam() {
  const [data, setData] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTeam() {
      try {
        const response = await axiosClient.get(`api/team/${params.id}`);
        console.log("team response: ", response.data.result);
        setData(response.data.result);
        // console.log(data);
      } catch (error) {
        console.log("error fething team", error);
      }
    }
    fetchTeam();
  }, []);

  return (
    <div className="flex justify-center text-white ">
      <div className="h-screen">
        <p className="text-xl text-center">{data.name}</p>
        <p className="text-center my-5 text-lg">Members</p>
        <div className="flex overflow-x-scroll hideScrollbar gap-5 w-screen px-10 mt-20">
          {data?.users?.map((user) => (
            <div
              key={user._id}
              className="bg-cyan-700 p-5 rounded font-medium my-10  shadow-2xl cursor-pointer"
              onClick={() => navigate(`/aboutUser/${user._id}`)}
            >
              <p className="text-lg">
                {user.first_name} {user.last_name}
              </p>
              <p>{user.gender}</p>
              <p>{user.email}</p>
              <p>{user.domain}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutTeam;
