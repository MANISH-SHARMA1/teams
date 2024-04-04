import React, { useEffect, useState } from "react";
import { axiosClient } from "../utils/axiosClient";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function CreateTeams() {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axiosClient.get("/api/users");
        setUsers(response.data.result);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchUsers();
  }, []);

  const handleUserSelection = (userId) => {
    const user = users.find((user) => user._id === userId);
    const index = selectedUsers.findIndex((user) => user._id === userId);
    if (index === -1) {
      setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, user]);
    } else {
      setSelectedUsers((prevSelectedUsers) =>
        prevSelectedUsers.filter((user) => user._id !== userId)
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post("/api/team", {
        name,
        users: selectedUsers.map((user) => user._id),
      });
      toast.success(response.data.result);
      navigate("/allTeams");

      setName("");
      setSelectedUsers([]);
    } catch (error) {
      console.error("Error creating team:", error);
      toast.error("Failed to create team");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      !selectedUsers.find(
        (selectedUser) => selectedUser.domain === user.domain
      ) &&
      !selectedUsers.find(
        (selectedUser) => selectedUser.available === user.available
      )
  );

  return (
    <div className="flex justify-center py-10 h-screen">
      <div>
        <form
          onSubmit={handleSubmit}
          className="border-2 rounded p-5 text-white"
        >
          <h2 className="font-bold text-lg mb-2">Select Users for the Team</h2>
          <label htmlFor="teamName" className="font-semibold">
            Team Name:{" "}
          </label>
          <br />
          <input
            className="w-full my-2 rounded text-cyan-700 p-1"
            type="text"
            id="teamName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <h3 className="font-bold text-lg mb-2">Select Users:</h3>
          {filteredUsers?.map((user) => (
            <div key={user._id}>
              <input
                type="checkbox"
                id={user._id}
                onChange={() => handleUserSelection(user._id)}
              />
              <label htmlFor={user._id}>
                {user.first_name} {user.last_name}
              </label>
            </div>
          ))}
          <button type="submit" className="border-2 p-1 rounded  mt-3 ">
            Create Team
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateTeams;
