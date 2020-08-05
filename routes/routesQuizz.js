const express = require("express");
const router = express.Router();
const Quizz = require("../models/Quizz");
const User = require("../models/User");
const fileUpload = require("../config/cloudinary");
const app = express();


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



router.post("/new", fileUpload.single("image"),(req, res, next) => {
  var quizzToCreate = req.body;
  quizzToCreate.creator = req.session.currentUser._id;  
  if (!req.file) {
    delete quizzToCreate.image
  }else{
    quizzToCreate.image = req.file.path;}
  Quizz.create(quizzToCreate)
    .then((newQuizz) => {
      // console.log("NEWQUIZZID", newQuizz, newQuizz._id);
      User.findByIdAndUpdate(req.session.currentUser._id, {
        $push: { quizzCreated: newQuizz._id },
      })
        .then((updUser) => {
          res.status(201).json(newQuizz);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.patch("/:id", fileUpload.single("image"),(req, res, next) => {
  var quizzToUpdate = req.body;
    if (!req.file) {
    delete quizzToUpdate.image
  }else{
    quizzToUpdate.image = req.file.path;}
console.log(req.body,req.file)

  Quizz.findByIdAndUpdate(req.params.id,quizzToUpdate, { new: true })
  
    .then((updatedQuizz) => {
      res.status(200).json(updatedQuizz);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res, next) => {
  Quizz.findByIdAndDelete(req.params.id)
    .then((quizzDeleted) => {
      User.findByIdAndUpdate(req.session.currentUser._id, {
        $pull: { quizzCreated: req.params.id },
      })
      then((dbRes)=>{
        res.sendStatus(202);
      })
      .catch((err) => console.error(err));
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
