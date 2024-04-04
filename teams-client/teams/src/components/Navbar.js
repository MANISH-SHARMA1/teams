import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-around bg-cyan-700 text-white font-bold  py-2 shadow-2xl">
      <p className="cursor-pointer" onClick={() => navigate("/")}>
        Users
      </p>
      <p className="cursor-pointer" onClick={() => navigate("/createUser")}>
        Create User
      </p>
      <p className="cursor-pointer" onClick={() => navigate("/createTeams")}>
        Create Team
      </p>
      <p className="cursor-pointer" onClick={() => navigate("/allTeams")}>
        Teams
      </p>
    </div>
  );
}

export default Navbar;
