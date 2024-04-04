import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosClient } from "../utils/axiosClient";
import toast from "react-hot-toast";

function UpdateUser() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    gender: "Male",
    domain: "",
    available: false,
    email: "",
  });

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axiosClient.get(`api/users/${params.id}`);
        setFormData(response.data.result);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  async function updateUser(e) {
    e.preventDefault();
    try {
      const response = await axiosClient.put(
        `api/users/${params.id}`,
        formData
      );
      toast.success(response.data.result);
      navigate("/");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }

  return (
    <div className="flex justify-center text-white ">
      <form onSubmit={updateUser} className="border-2 rounded p-5 my-5 w-96">
        <p className="text-center text-xl font-bold">Update User</p>
        <div className="my-5 font-semibold">
          <label htmlFor="firstName">First name</label>
          <br />
          <input
            className="w-full mt-2 rounded text-cyan-700 p-1"
            type="text"
            id="firstName"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
        </div>

        <div className="my-5 font-semibold">
          <label htmlFor="lastName">Last Name</label>
          <br />
          <input
            className="w-full mt-2 rounded text-cyan-700 p-1"
            type="text"
            id="lastName"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
        </div>

        <div className="my-5 font-semibold">
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="w-full mt-2 rounded text-cyan-700 p-1"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="my-5 font-semibold">
          <label htmlFor="gender">Gender:</label>
          <br />
          <select
            className="w-full mt-2 rounded text-cyan-700 p-1"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="my-5 font-semibold">
          <label htmlFor="domain">Domain</label>
          <br />
          <input
            className="w-full mt-2 rounded text-cyan-700 p-1"
            type="text"
            id="domain"
            name="domain"
            value={formData.domain}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-between items-center mt-3">
          <div>
            <input
              className="mr-2"
              type="checkbox"
              id="available"
              name="available"
              checked={formData.available}
              onChange={handleChange}
            />
            <label htmlFor="available">Available</label>
          </div>

          <button type="submit" className="border-2 rounded p-1">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateUser;
