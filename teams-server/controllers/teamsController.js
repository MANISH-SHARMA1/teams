const teams = require("../models/teamsSchema");
const users = require("../models/users");
const { error, success } = require("../utils/responseWrapper");

const createTeam = async (req, res) => {
  try {
    const { name, users } = req.body;
    console.log("name: ", name, "users: ", users);

    if (!users) {
      return res.send(error(400, "Please provide a specific name of the team"));
    }

    const team = new teams({
      name,
      users,
    });

    const savedTeam = await team.save();

    return res.send(success(200, "Team Create Successfully"));
  } catch (e) {
    console.log(e);
  }
};

const getAllTeams = async (req, res) => {
  try {
    const team = await teams.find().populate("users");
    res.json(success(200, team));
  } catch (error) {
    console.error("Error fetching teams:", error);
    res.json(error(500, "Could not fetch teams"));
  }
};

const retrieveTeam = async (req, res) => {
try {
  const teamId = req.params.id;

  if (!teamId) {
    return res.send(error(400, "Please provide team id"));
  }

  const team = await teams.findById(teamId).populate("users");

  if (!team) {
    return res.send(error(400, "Team is not present"));
  }

  return res.send(success(200, team));
} catch (e) {
  console.log(e);
}
};

module.exports = {
  createTeam,
  getAllTeams,
  retrieveTeam,
};
