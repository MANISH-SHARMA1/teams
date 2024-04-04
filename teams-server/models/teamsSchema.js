const mongoose = require("mongoose");

const teamsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
});

module.exports = mongoose.model("teams", teamsSchema);
