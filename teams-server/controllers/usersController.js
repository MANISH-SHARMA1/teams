const users = require("../models/users");
const { error, success } = require("../utils/responseWrapper");

const createUserController = async (req, res) => {
  try {
    const { first_name, last_name, email, gender, avatar, domain, available } =
      req.body;

    if (!first_name || !last_name || !email || !gender || !avatar || !domain) {
      return res.send(error(400, "All fields are required."));
    }

    await users.create({
      first_name,
      last_name,
      email,
      gender,
      avatar,
      domain,
      available,
    });

    return res.send(success(200, "User Created Successfully"));
  } catch (e) {
    console.log(e);
    res.send(error(400, e));
  }
};

const retrieveUserController = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.send(error(400, "User Id is required"));
    }

    const user = await users.findById(userId);

    if (!user) {
      return res.send(error(400, "No such user find"));
    }

    return res.send(success(200, user));
  } catch (e) {
    res.send(error(400, e));
  }
};

const retrieveUserPaginationController = async (req, res) => {
  const skip = req.query.skip ? Number(req.query.skip) : 0;
  const DEFAULT_LIMIT = 10;

  try {
    const usersList = await users.find({}).skip(skip).limit(DEFAULT_LIMIT);

    if (usersList.length == 0) {
      return res.send(error(400, "No user find"));
    }

    return res.json(success(200, usersList));
  } catch (e) {
    console.log(e);
  }
};

const updateUserController = async (req, res) => {
  const { first_name, last_name, email, gender, domain, available } = req.body;

  const userId = req.params.id;

  if (!userId) {
    res.send(error(400, "User is required"));
  }

  if (!first_name || !last_name || !email || !gender || !domain) {
    return res.send(error(400, "All fields are required."));
  }

  const oldUser = await users.findById(userId);

  if (!oldUser) {
    res.send(error(400, "User is not present"));
  }

  if (available !== undefined) {
    oldUser.available = available === "true"; // Convert string to boolean
  }

  if (first_name) {
    oldUser.first_name = first_name;
  }
  if (last_name) {
    oldUser.last_name = last_name;
  }
  if (email) {
    oldUser.email = email;
  }
  if (gender) {
    oldUser.gender = gender;
  }
  if (domain) {
    oldUser.domain = domain;
  }
  if (available) {
    oldUser.available = available;
  }

  await oldUser.save();

  return res.send(success(200, "User updated successfully"));
};

const deleteUserController = async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.send(error(400, "User is required"));
  }

  const user = users.findById(userId);

  if (!user) {
    return res.send(error(400, "No such user found"));
  }

  await users.deleteOne(user);

  return res.send(success(200, "User deleted successfully"));
};

module.exports = {
  createUserController,
  retrieveUserController,
  retrieveUserPaginationController,
  updateUserController,
  deleteUserController,
};
