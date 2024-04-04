import React, { useEffect, useState } from "react";
import { axiosClient } from "../utils/axiosClient";
import { useParams } from "react-router-dom";

function AboutUser() {
  const [data, setData] = useState({});
  const params = useParams();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axiosClient.get(`api/users/${params.id}`);
        setData(response.data.result);
      } catch (error) {
        console.log("Error while fetching user: ", error);
      }
    }

    fetchUser();
  }, []);

  return (
    <div className="flex justify-center text-white">
      <div className=" py-16">
        <p className="text-3xl font-semibold ">About User</p>
        <div className="py-14">
          <p className="text-xl font-semibold">
            {data.first_name} {data.last_name}
          </p>
          <p className="py-3">
            <span className="text-lg">Gender:</span> <br />
            {data.gender}
          </p>
          <p className="py-3">
            <span className="text-lg">Email:</span> <br />
            {data.email}
          </p>
          <p className="py-3">
            <span className="text-lg">Domain:</span> <br />
            {data.domain}
          </p>
          <p className="py-3">
            <span className="text-lg">Availability:</span>
            <br />
            {data.available == true ? <p>Available</p> : <p>Not Available</p>}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUser;
