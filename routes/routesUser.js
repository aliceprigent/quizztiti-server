const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/me", (req, res, next) => {
  User.findById(req.session.currentUser._id)
    .populate("Quizz")
    .populate("Team")
    .then((oneUser) => {
      res.status(200).json(oneUser);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.patch("/me", (req, res) => {
  console.log(req.body)
  User.findByIdAndUpdate(req.session.currentUser._id, req.body, {
    new: true,
  })
    .then((updatedUser) => {
      res.status(200).json(updatedUser);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/", (req, res, next) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
