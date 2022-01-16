const express = require("express");
const gamesControllers = require("../controllers/games.controllers");
const router = express.Router();

router.route("/heroes")
    .get(gamesControllers.getAll)
    .post(gamesControllers.addOne);
    
router.route("/heroes/:heroId")
    .get(gamesControllers.getOne);
    
module.exports = router;
