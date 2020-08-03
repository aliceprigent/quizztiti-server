const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  image: {
    type: String,
    default: "/media/teams/flame-success.png",
  },
  description : String,
  members: { type: [Schema.Types.ObjectId], ref: "User" },
  teamQuizz: { type: [Schema.Types.ObjectId], ref: "Quizz" },
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
