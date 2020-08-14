const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const salt = 10;
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
  const { name, email, password, image } = req.body;
  const hashedPassword = bcrypt.hashSync(password, salt);
  const updatedUser = { name, email, password : hashedPassword, image };

  User.findByIdAndUpdate(req.session.currentUser._id, updatedUser, {
    new: true,
  })
    .then((updatedUser) => {
      // console.log("updated user :", updatedUser);
      const userObj = updatedUser.toObject();
      delete userObj.password;
      req.session.currentUser = userObj;
      res.status(200).json(userObj);
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


// RETRIVE USERS WITH A AND QUERY
router.get("/", (req, res, next) => {
  // console.log(req.query)
  const query= {...req.query};
  console.log("query",query)
  User.find( {$and : [query]})
  .populate('teams')
  .populate('quizzCreated')
    .then((users) => {
      console.log("getting users with query in back", users)
      res.status(200).json(users);
    })
    .catch((err) => {
      console.error("ERR while getting users with query in back", err)
      res.status(500).json(err);
    });
});

//RESET PASSWORD FOR A USER
router.patch("/reset/:name", (req, res)=> {
   console.log("rest pwd body : ", req.body)
const {email, password} = req.body;
const hashedPassword = bcrypt.hashSync(password, salt);
  const updatedPassword = { password : hashedPassword};

User.findOneAndUpdate( {$and : [{name : req.params.name}, {email : email}]}, updatedPassword, {new :true})
    .then((updatedUser) => {
      const userObj = updatedUser.toObject();
      delete userObj.password;
      console.log("user with reset pwd", userObj);
      req.session.currentUser = userObj;
      res.status(200).json(userObj);
    })
    .catch((err) => {
      console.error("ERR while pwd reset in back", err)
      res.status(500).json(err);
    });

})





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
