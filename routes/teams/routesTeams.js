const express = require("express");
const router = express.Router();
const TeamModel = require("../../models/Teams")

router.get("/", function (req, res, next) {
  TeamModel.find()
  .then((listofTeams) => {
    console.log(`retrived all the teams ! : ${listofTeams.data}`)
    res.status(200).json(listofTeams);
  })
  .catch((err) => res.sendStatus(500))
});

router.get("/:id", function (req, res, next) {
  TeamModel.findById(req.params.id)
  .then((TeamJSON) => {
    console.log(`retrived the team with unique ID ! : ${TeamJSON.data}`)
    res.status(200).json(TeamJSON);
  })
  .catch((err) => res.sendStatus(500))
});

router.patch("/:id/edit", function (req, res, next) {
  TeamModel.findByIdAndUpdate(req.params.id, req.body, {new : true})
  .then((TeamJSON) => {
    console.log(`updated the team with unique ID ! here's the update : ${TeamJSON.data}`)
    res.status(201).json(TeamJSON);
  })
  .catch((err) => res.sendStatus(500))
});

router.delete("/:id", function (req, res, next) {
  TeamModel.findByIdAndDelete(req.params.id)
  .then(() => {
    console.log(`team deleted :(`);
    res.sendStatus(200)
  })
  .catch((err) => res.sendStatus(500))
});







module.exports = router;
