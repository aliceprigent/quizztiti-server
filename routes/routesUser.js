const express = require("express");
const router = express.Router();
const UserModel = require("../models/User");

router.get("/full-user", function (req, res, next) {
  UserModel.findById(req.session.currentUser._id)
    .populate("Quizz")
    .populate("Team")
    .then((dBres) => {
      res.status(200).json(dBres);
    })
    .catch((err) => {
      res.status(500).json(res);
    });
});

router.get("/user", (req, res, next) => {
  UserModel.findById(req.session.currentUser._id)
    .populate("Quizz")
    .then((oneUser) => {
      res.status(200).json(oneUser);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.patch("/user/edit", (req, res) => {
  UserModel.findByIdAndUpdate(req.session.currentUser._id, req.body, {
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
  UserModel.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
