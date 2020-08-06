const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizzSchema = new Schema({
  supplier: {
    type: String,
    default: "Quizztiti",
  },
  author: String,
  image: {
    type: String,
    default: "/media/quizzDefault.jpg",
  },
  title: String,
  quizzTotal: [
    {
      index: Number,
      question: String,
      propositions: [String],
      answer: String,
      funFact: String,
    },
  ],
  thema: {
    type: String,
    enum: [
      "Nature",
      "General",
      "Health",
      "Celebrity",
      "Society",
      "Miscellaneous",
    ],
    default: "Miscellaneous",
  },
  status: {
    type: String,
    enum: ["Public", "Private"],
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Quizz = mongoose.model("Quizz", quizzSchema);
module.exports = Quizz;
