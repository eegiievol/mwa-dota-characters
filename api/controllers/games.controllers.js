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
    console.log("get One called");
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
    addOne
};

