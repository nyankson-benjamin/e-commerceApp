const mongoose = require("mongoose");
const app = require("./app");
require("dotenv/config");

const dbURI = process.env.DB_URL_NEW;
mongoose
  .connect(dbURI)
  .then((result) => {
    app.listen(8000);
    console.log("Connected to db");
  })
  .catch((err) => {
    console.log("Couldn't connect to the database")
    console.log(err);
  });
