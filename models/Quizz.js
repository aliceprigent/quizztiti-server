const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizzSchema = new Schema({
  supplier: String,
  author: String,
  image: String,
  title: String,
  quizzTotal: [
    {
   
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
      "General Culture",
      "Health and Beauty",
      "Celebrity",
      "Society",
      "Miscellaneous",
    ],
  },
  status:{
      type:String,
      enum:[
          "Public",
          "Private",
      ]
  }
});

const Quizz = mongoose.model("Quizz", quizzSchema);
module.exports = Quizz;


 //   index: { type: Number, index: true },