const express = require("express");
const match = require("nodemon/lib/monitor/match");
const gamesControllers = require("../controllers/games.controllers");
const matchesControllers = require("../controllers/match.controller");
const router = express.Router();

router.route("/heroes")
    .get(gamesControllers.getAll)
    .post(gamesControllers.addOne);

router.route("/heroes/:heroId")
    .get(gamesControllers.getOne)
    .delete(gamesControllers.deleteOne);

router
    .route("/heroes/:heroId/match")
    .get(matchesControllers.getOne)
    .post(matchesControllers.addOne);

module.exports = router;
