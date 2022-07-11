const express = require("express");

const userRoutes = express.Router();

const dbo = require("../db/conn");

const ObjectId = require("mongodb").ObjectId;

//Get username and profile image (for new posts and profile page - already contained when fetching an individual post)

userRoutes.route("/users/:username").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { username: req.params.username };
  db_connect.collection("users").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

module.exports = userRoutes;
