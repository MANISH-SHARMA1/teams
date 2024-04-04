import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Users from "./pages/Users";
import UpdateUser from "./components/UpdateUser";
import AboutUser from "./components/AboutUser";
import CreateUser from "./pages/CreateUser";
import CreateTeams from "./pages/CreateTeams";
import Teams from "./pages/Teams";
import { Toaster } from "react-hot-toast";
import AboutTeam from "./components/AboutTeam";

function App() {
  return (
    <div className="bg-cyan-700">
      <Toaster />
      <Navbar />

      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/aboutUser/:id" element={<AboutUser />} />
        <Route path="/updateUser/:id" element={<UpdateUser />} />
        <Route path="/createUser" element={<CreateUser />} />
        <Route path="/createTeams" element={<CreateTeams />} />
        <Route path="/allTeams" element={<Teams />} />
        <Route path="/aboutTeam/:id" element={<AboutTeam />} />
      </Routes>
    </div>
  );
}

export default App;
