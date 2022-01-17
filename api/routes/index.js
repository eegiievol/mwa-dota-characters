const express = require("express");
const match = require("nodemon/lib/monitor/match");
const gamesControllers = require("../controllers/games.controllers");
const matchesControllers = require("../controllers/matches.controller");
const router = express.Router();

router.route("/heroes")
    .get(gamesControllers.getAll)
    .post(gamesControllers.addOne);

router.route("/heroes/:heroId")
    .get(gamesControllers.getOne)
    .delete(gamesControllers.deleteOne);

module.exports = router;
