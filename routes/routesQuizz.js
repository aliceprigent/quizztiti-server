const express = require("express");
const router = express.Router();
const Quizz = require("../models/Quizz");
const User=require("../models/User")

router.get("/", (req, res, next) => {
  Quizz.find()
    .then((Allquiz) => {
      res.status(200).json(Allquiz);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res, next) => {
  Quizz.findById(req.params.id)
    .then((oneQuizz) => {
      res.status(200).json(oneQuizz);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/", (req, res, next) => {
  Quizz.create(req.body)
    .then((createdQuizz) => {
      res.status(201).json(createdQuizz);
      User.findByIdAndUpdate(req.session.currentUser._id,{ $push: { createdQuizz: createdQuizz._id } })   
      .then((updUser)=>{res.status(201).json(createdQuizz)}) 
      .catch((err) => {
        res.status(500).json(err);
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.patch("/:id", (req, res, next) => {
  Quizz.findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then((updatedQuizz) => {
    res.status(200).json(updatedQuizz);
  }).catch((err) => {
    res.status(500).json(err);
  });
});

router.delete("/:id", (req, res, next) => {
  Quizz.findByIdAndDelete(req.params.id)
    .then((quizzDeleted) => {
      res.sendStatus(204);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
