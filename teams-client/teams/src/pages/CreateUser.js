import React, { useState } from "react";
import { axiosClient } from "../utils/axiosClient";
import toast from "react-hot-toast";

function CreateUser() {
  const defaultFormData = {
    first_name: "",
    last_name: "",
    gender: "Male",
    avatar: "",
    domain: "",
    available: false,
    email: "",
  };

  const [formData, setFormData] = useState(defaultFormData);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const createUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post("api/users", formData);
      console.log("Create User: ", response);
      toast.success(response.data.result);
      setFormData(defaultFormData);
    } catch (error) {
      console.log("Error while creating user: ", error);
    }
  };

  
  return (
    <div className="flex justify-center">
      <form
        onSubmit={createUser}
        className="block my-10 text-white font-semibold border-2 rounded p-5 w-96"
      >
        <p className="text-center text-xl font-bold">Create User</p>
        <div className="my-5 ">
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

        <div className="my-5 ">
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

        <div className="my-5 ">
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

        <div className="my-5 ">
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

        <div className="my-5 ">
          <label htmlFor="avatar">Avatar Link:</label>
          <br />
          <input
            className="w-full mt-2 rounded text-cyan-700 p-1"
            type="text"
            id="avatar"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
          />
        </div>

        <div className="my-5 ">
          <label htmlFor="domain">Domain</label> <br />
          <input
            className="w-full mt-2 rounded text-cyan-700 p-1"
            type="text"
            id="domain"
            name="domain"
            value={formData.domain}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-between items-center">
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

          <button type="submit" className="border-2 p-1 rounded ">
            Create User
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateUser;
