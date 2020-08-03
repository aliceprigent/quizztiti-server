const express = require("express");
const router = express.Router();
const TeamModel = require("../../models/Teams");
const UserModel = require("../../models/User");
const fileUpload = require("../../config/cloudinary");

router.get("/", function (req, res, next) {
  TeamModel.find()
    .then((listofTeams) => {
      console.log(`retrived all the teams !`);
      res.status(200).json(listofTeams);
    })
    .catch((err) => res.sendStatus(500));
});

router.post("/", fileUpload.single("image"), (req, res, next) => {
  var newTeam = {
    owner: req.session.currentUser._id,
    members: [req.session.currentUser._id, ...req.body.members],
    ...req.body,
  };

  delete newTeam.image;

  if (req.file) {
    newTeam.image = req.file.path;
  }

  TeamModel.create(newTeam).then((newTeam) => {
    console.log(`new team created !`);
    newTeam.members.forEach((member) => {
      console.log("here's one member of the team", newTeam.name, " - ", member);
      UserModel.findByIdAndUpdate(member, { $push: { teams: newTeam._id } }, {new :true})
      .then((DBres) => console.log("new team added to member"))
      .catch((err) => console.error(err))
    });
    res.status(201).json(newTeam);
  });
});

router.get("/:id", function (req, res, next) {
  TeamModel.findById(req.params.id)
  .populate("owner")
  .populate("members")
  .populate("teamQuizz")
    .then((TeamJSON) => {
      console.log(`retrived the team with unique ID ! : ${TeamJSON.data}`);
      res.status(200).json(TeamJSON);
    })
    .catch((err) => res.sendStatus(500));
});

router.patch("/:id", fileUpload.single("image"), function (req, res, next) {
  TeamModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((TeamJSON) => {
      console.log(
        `updated the team with unique ID ! here's the update : ${TeamJSON.data}`
      );
      res.status(202).json(TeamJSON);
    })
    .catch((err) => res.sendStatus(500));
});

router.delete("/:id", function (req, res, next) {
  TeamModel.findByIdAndDelete(req.params.id)
    .then(() => {
      console.log(`team deleted :(`);
      res.sendStatus(202);
    })
    .catch((err) => res.sendStatus(500));
});

module.exports = router;
