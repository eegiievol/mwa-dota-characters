const mongoose = require("mongoose");
const Heroes = mongoose.model(process.env.DB_HEROES_MODEL);


getOne = function (req, res) {
    console.log("get One called");
    const heroId = req.params.heroId
    Heroes.findById(heroId).exec(function (err, herodata) {
        console.log("found a HERO")
        res.status(200).json(herodata);
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
    Heroes.find().exec(function (err, heroesdata) {
        if (!err) {
            console.log("found a HEROES ..");
            res.status(200).json(heroesdata);
        }
        else {
            console.log("ERROR FETCHING");
            res.status(500).json(err);
        }

    })
}

deleteOne = function (req, res) {
    const gameId = req.params.gameId;

    if (!mongoose.isValidObjectId(gameId)) {
        console.log("invalid ID detect");
        res
            .status(400)
            .json({ message: "invalid ID detect" });
        return;
    }

    Heroes.deleteOne({ _id: gameId }).exec(function (err) {

        if (err) {
            console.log("Failed to delete hero");
            res.status(200).json(err);
        }
        else {
            res.status(response.status).json("Successfully deleted the hero");
        }
    });
};

addOne = function (req, res) {
    console.log("Adding new Hero");
    console.log(req.body);

    const newHero = {
        name: req.body.name,
        type: req.body.type,
        range: req.body.range,
        role: req.body.role
    };

    Heroes.create(newHero, function (err, hero) {
        const response = { status: 201, message: hero };

        if (err) {
            console.log("error creating new hero", err);
            response.status = 500;
            response.message = err;
        }

        res.status(response.status).json(response.message);
    });

};

module.exports = {
    getAll,
    getOne,
    addOne,
    deleteOne
};

