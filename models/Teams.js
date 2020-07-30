const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  name: { type: String, required: true },
  image: String,
  members: { type: [Schema.Types.ObjectId], ref: "User" },
  teamQuizz: { type: [Schema.Types.ObjectId], ref: "Quizz" },
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
