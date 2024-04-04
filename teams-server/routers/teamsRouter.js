const router = require("express").Router();
const teamsController = require("../controllers/teamsController");

router.post("/team", teamsController.createTeam);
router.get("/team", teamsController.getAllTeams);
router.get("/team/:id", teamsController.retrieveTeam);

module.exports = router;
