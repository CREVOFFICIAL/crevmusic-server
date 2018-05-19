const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// parse application/json && application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.url)
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(err => {
    console.log("Could not connect to the database. Exiting now...");
    process.exit();
  });

require("./app/routes/playlist.routes.js")(app);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
