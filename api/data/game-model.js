const mongoose = require("mongoose");

const matchSchema= mongoose.Schema({
    region: {
        type: String,   //usa, asia, europe, ces etc..
        required : true,
        default: "USA"
    },
    date: {
        type: Date,
        required : true,
        default: Date.now,
    },
    matchmaking: {
        type: String, //ranked, normal, bots etc..
        required : true
    },
    winner: {
        type: String, //dire or radiant
        required : false
    },
})

const heroSchema = mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    type: {
        type: String,
        required : true
    },
    range: {
        type: Boolean,
        required : true
    },
    role: {
        type: String,
        required : true
    },
    matches: [matchSchema]
});

mongoose.model(process.env.DB_HEROES_MODEL, heroSchema, "heroes");