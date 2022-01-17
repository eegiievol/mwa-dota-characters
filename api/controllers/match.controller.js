const req = require("express/lib/request");
const res = require("express/lib/response");
const mongoose = require("mongoose");
const Match = mongoose.model(process.env.DB_HEROES_MODEL);

addOne = function (req, res) {
    console.log("Match addone called");

    const heroId = req.params.heroId;

    Match
        .findById(heroId)
        .select("match")
        .exec(function (err, game) {
            const response = {
                status: 201,
                message: game,
            };

            if (err) {
                console.log("Add match Exec ERROR")
                response.status = 500;
                response.message = err;
            }
            else if (!game) {
                console.log("Add match heroId not found ERROR")
                response.status = 404;
                response.message = "heroId not found:" + heroId;
            }
            else if (game) {
                game.match.region = req.body.region;                
                game.match.matchmaking = req.body.matchmaking;
                game.match.winner = req.body.winner;

                game.save(function (err, updatedGame) {
                    const response = {
                        status: 201,
                        message: updatedGame,
                    };

                    if (err) {
                        response.status = 500;
                        response.message = err;
                    }
                    res.status(response.status).json(response.message);
                });
            }
        });
};


deleteOne = function (req, res) {
    const matchId = req.params.matchId;

    if (!mongoose.isValidObjectId(matchId)) {
        console.log("invalid ID detect");
        res
            .status(400)
            .json({ message: "invalid ID detect" });
        return;
    }

    Match.deleteOne({ _id: matchId }).exec(function (err) {

        if (err) {
            console.log("Failed to delete match");
            res.status(200).json(err);
        }
        else {
            res.status(response.status).json("Successfully deleted the match");
        }
    });
};

getOne = function (req, res) {
    console.log("Match get One called");
    const matchId = req.params.matchId
    Match.findById(matchId).exec(function (err, matchdata) {
        console.log("found a MATCH")
        if (err) { res.status(500).json(err); }
        else { res.status(200).json(matchdata); }
    })
}

getAll = function (req, res) {

    let count = parseInt(process.env.DEFAULT_FIND_LIMIT);
    let offset = parseInt(process.env.DEFAULT_FIND_OFFSET);
    const maxCount = parseInt(process.env.MAX_FIND_LIMIT);

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count);
    }

    if (count > maxCount) {
        console.log("Count exceeds maximum limit!!");
        res
            .status(400)
            .json({ message: "Cannot exceed count limit of: " + maxCount });
        return;
    }

    if (isNaN(offset) || isNaN(count)) {
        console.log("offset or count is NOT number");
        res
            .status(400)
            .json({ message: "QueryString offset and count must be digits" });
        return;
    }

    console.log("get All called");
    Heroes.find().exec(function (err, matchdata) {
        if (!err) {
            console.log("found a MATCHES ..");
            res.status(200).json(matchdata);
        }
        else {
            console.log("ERROR FETCHING");
            res.status(500).json(err);
        }

    })
}

module.exports = {
    getOne,
    addOne,
    deleteOne,
    getAll
};
