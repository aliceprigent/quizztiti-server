const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  image: {
    type: String,
    default: "https://img.icons8.com/color/48/000000/einstein.png",
  },
  teams: [
    {
      type: Schema.Types.ObjectId,
      ref: "Team",
    },
  ],
  quizzCreated: [
    {
      type: Schema.Types.ObjectId,
      ref: "Quizz",
    },
  ],
  quizzDone: [
    {
      quizzID: {
        type: Schema.Types.ObjectId,
        ref: "Quizz",
      },
      score: Number,
    },
  ],
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
