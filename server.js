const express = require("express")
const MongoClient = require("mongodb").MongoClient
const bodyParser = require("body-parser")
const app = express()
const db = require("./db")
const port = 8000

app.use(bodyParser.urlencoded({ extended: true }))

MongoClient.connect(db.url, (err, db) => {
  if (err) return console.log(err)
  db = db.db("such-notes")
  require("./routes")(app, db)
  app.listen(port, () => {
    console.log("we are live on " + port)
  })
})