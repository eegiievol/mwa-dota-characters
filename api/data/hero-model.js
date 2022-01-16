const mongoose = require("mongoose");

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
    }
});

mongoose.model(process.env.DB_HEROES_MODEL, heroSchema, "heroes");