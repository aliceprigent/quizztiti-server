const express = require("express");
const router = express.Router();
const Quizz = require("../models/Quizz");

const fileUpload = require("../config/cloudinary");
const { json } = require("express");

router.get("/:id", (req, res, next) => {
  console.log(req.params.id)
  Quizz.find({ "quizzTotal._id": req.params.id }, { quizzTotal: 1 })
    .then((oneQuizz) => {
      console.log("ONE QUIZZZZZ",oneQuizz)
      res.status(200).json(oneQuizz);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.patch("/:id", fileUpload.single("image"), (req, res, next) => {
  const {
    _idParentQuizz,
    _idIndex,
    index,
    question,
    proposition1,
    proposition2,
    proposition3,
    proposition4,
    answer,
    funFact,
  } = req.body;
  // console.log("REQ.body",req.body,"req.params.id",req.params.id)
  
  Quizz.updateOne(
    { _id: _idParentQuizz, "quizzTotal._id": req.params.id ,},
    {
      $set: {
        "quizzTotal.$.question": question,
        "quizzTotal.$.propositions.0": proposition1,
        "quizzTotal.$.propositions.1": proposition2,
        "quizzTotal.$.propositions.2": proposition3,
        "quizzTotal.$.propositions.4": proposition4,
        "quizzTotal.$.answer": answer,
        "quizzTotal.$.funFact":funFact
      },
    }
  )
    .then((apiRes) => {
      console.log(apiRes);
      res.status(200).json(apiRes)
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
