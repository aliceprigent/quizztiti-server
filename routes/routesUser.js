const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/full-user", function (req, res, next) {
  User.findById(req.session.currentUser._id)
    .populate("Quizz")
    .populate("Team")
    .then((dBres) => {
      res.status(200).json(dBres);
    })
    .catch((err) => {
      res.status(500).json(res);
    });
});

router.get("/", (req, res, next) => {
  User.findById(req.session.currentUser._id)
    .populate("Quizz")
    .then((oneUser) => {
      res.status(200).json(oneUser);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.patch("/edit", (req, res) => {
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

router.get("/all-users", (req, res, next) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
