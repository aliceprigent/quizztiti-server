const express = require("express");
const router = express.Router();
const Quizz = require("../models/Quizz");

const fileUpload = require("../config/cloudinary");

router.get("/:id", (req, res, next) => {
  Quizz.find({ "quizzTotal._id": req.params.id }, { quizzTotal: 1 })
    .then((oneQuizz) => {
      // console.log("ONE QUIZZZZZ",oneQuizz)
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
    propositions,
    answer,
    funFact,
  } = req.body;
  // console.log("REQ.body",req.body,"req.params.id",req.params.id)
  let questToSend = null;
  questToSend = { question, propositions, answer, funFact };
  console.log("questToSend", questToSend.question);

  Quizz.updateOne(
    { _id: _idParentQuizz, "quizzTotal._id": req.params.id },
    {
      $set: {
        "quizzTotal.$.question": question,
        "quizzTotal.$.propositions": {$set:{"propositions.$.[0]":propositions[0]}},
        "quizzTotal.$.answer": answer,
        "quizzTotal.$.funFact":funFact
      },
    }
  )
    .then((apiRes) => {
      console.log(apiRes);
      res.status(200)
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
