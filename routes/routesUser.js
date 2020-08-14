const express = require("express");
const router = express.Router();
const User = require("../models/User");
// const Quizz = require("../models/Quizz");
// const Teams = require("../models/Teams");


router.get("/me", (req, res, next) => {
  User.findById(req.session.currentUser._id)
    .populate("teams")
    .populate("quizzCreated")
    .populate("quizzDone.quizzID")
    .then((oneUser) => {
      // console.log("current user data retrived");
      res.status(200).json(oneUser);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.patch("/me", (req, res) => {
  // console.log(req.body);
  User.findByIdAndUpdate(req.session.currentUser._id, req.body, {
    new: true,
  })
    .then((updatedUser) => {
      // console.log("updated user :", updatedUser);
      res.status(200).json(updatedUser);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.patch("/delete-team", (req, res) => {
  // console.log("in backend user routes", req.body);
  User.findByIdAndUpdate( req.body.userId, { $pull: { teams : req.body.teamId }}, {
    new: true,
  })
    .then((updatedUser) => {
      // console.log("updated user :", updatedUser);
      res.status(200).json(updatedUser);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.patch("/:id", (req, res) => {
  //console.log(req.body);
  User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .then((updatedUser) => {
      // console.log("updated user :", updatedUser);
      res.status(200).json(updatedUser);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});



router.get("/", (req, res, next) => {
  // console.log(req.query)
  const query= {...req.query};
  console.log("query",query)
  User.find( {$and : [query]})
  .populate('teams')
  .populate('quizzCreated')
    .then((users) => {
      console.log("in back", users)
      res.status(200).json(users);
    })
    .catch((err) => {
      console.error("in back", err)
      res.status(500).json(err);
    });
});

router.delete("/",(req,res,next)=>{
  console.log("usertodelete,",req.query._id)
  User.findByIdAndDelete(req.query._id)
  .then((deletedUser)=>{
    res.status(200).json(deletedUser);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
})

module.exports = router;
