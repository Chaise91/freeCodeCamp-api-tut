import express from "express";
import { MongoClient } from "mongodb";
import { urlencoded } from "body-parser";
const app = express();
import { url } from "./db";
const port = 8000;

app.use(urlencoded({ extended: true }));

MongoClient.connect(url, (err, db) => {
  if (err) return console.log(err);
  db = db.db("such-notes");
  require("./routes")(app, db);
  app.listen(port, () => {
    console.log("we are live on " + port);
  });
});

/* Adding a comment to test git */