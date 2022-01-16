const mongoose = require("mongoose");
require("./hero-model");
mongoose.connect(process.env.DB_URL);

mongoose.connection.on("connected", function(){
    console.log("Connected to MongoDB" + process.env.DB_NAME);
})


