const router = require("express").Router();
const usersController = require("../controllers/usersController");

router.post("/users", usersController.createUserController);
router.get("/users/:id", usersController.retrieveUserController);
router.get("/users", usersController.retrieveUserPaginationController);
router.put("/users/:id", usersController.updateUserController);
router.delete("/users/:id", usersController.deleteUserController);

module.exports = router;
