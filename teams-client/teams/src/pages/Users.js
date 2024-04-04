import React, { useEffect, useState } from "react";
import { axiosClient } from "../utils/axiosClient";
import { useNavigate } from "react-router-dom";
import { TbUserUp } from "react-icons/tb";
import { MdOutlineDeleteOutline } from "react-icons/md";
import toast from "react-hot-toast";

function Users() {
  const [data, setData] = useState([]);
  const [skip, setSkip] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [domainFilter, setDomainFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axiosClient.get(`api/users/?skip=${skip}`);
        if (response.data.result.length === 0) {
          setIsEnd(true);
          return;
        }

        setData([...data, ...response.data.result]);
      } catch (e) {
        console.log("Error while fetching users: ", e);
        toast.error("Unable to get data");
      }
    }
    fetchUsers();
  }, [toggle, skip]);

  const handleScroll = (e) => {
    try {
      console.log("HandleScroll called");
      const { offsetHeight, scrollTop, scrollHeight } = e.target;

      if (offsetHeight + scrollTop >= scrollHeight && !isEnd) {
        setSkip(skip + 10);
      }
    } catch (error) {
      console.log("Error in handleScroll", error);
    }
  };

  async function deleteUser(userId) {
    try {
      const response = await axiosClient.delete(`api/users/${userId}`);
      toast.success(response.data.result);
      setToggle(!toggle);
    } catch (error) {
      console.log("Delete Error: ", error);
    }
  }

  const filteredUsers = data?.filter((user) => {
    const nameMatches =
      user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchQuery.toLowerCase());
    const domainMatches = domainFilter ? user.domain === domainFilter : true;
    const genderMatches = genderFilter ? user.gender === genderFilter : true;
    const availabilityMatches = availabilityFilter
      ? user.available === (availabilityFilter === "true")
      : true;
    return nameMatches && domainMatches && genderMatches && availabilityMatches;
  });

  return (
    <div
      className="flex justify-center h-screen overflow-scroll hideScrollbar py-5"
      onScroll={handleScroll}
    >
      <div>
        <div>
          <input
            className="text-cyan-700"
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select
            value={domainFilter}
            onChange={(e) => setDomainFilter(e.target.value)}
            className="text-cyan-700"
          >
            <option value="">All Domains</option>
            <option value="domain1">Domain 1</option>
            <option value="domain2">Domain 2</option>
            {/* Add more options as needed */}
          </select>

          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="text-cyan-700"
          >
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            className="text-cyan-700"
          >
            <option value="">All</option>
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
        </div>

        <div>
          {filteredUsers?.length == 0 ? (
            <p className="h-screen text-center text-white text-2xl">
              No user available.
            </p>
          ) : (
            filteredUsers?.map((user) => (
              <div
                key={user._id}
                className="bg-cyan-700 p-5 text-white rounded font-medium my-10  shadow-2xl "
              >
                <div className="flex justify-between items-center">
                  <p
                    onClick={() => navigate(`/aboutUser/${user._id}`)}
                    className="cursor-pointer text-xl"
                  >
                    {user.first_name} {user.last_name}
                  </p>
                  <div>
                    <img src={user.avatar} alt="UserImg" />
                  </div>
                </div>

                <p className="my-3">{user.gender}</p>
                <p className="">{user.domain}</p>
                <div className="flex justify-between text-xl mt-2">
                  <p
                    onClick={() => navigate(`/updateUser/${user._id}`)}
                    className="cursor-pointer"
                  >
                    <TbUserUp />
                  </p>
                  <p
                    onClick={() => deleteUser(user._id)}
                    className="cursor-pointer"
                  >
                    <MdOutlineDeleteOutline />
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Users;
