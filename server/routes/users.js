const express = require("express");

const userRoutes = express.Router();

const dbo = require("../db/conn");

const ObjectId = require("mongodb").ObjectId;

//Create new user in mongo
userRoutes.route("/users/add").post(function (req, response) {
  let db_connect = dbo.getDb();

  let myobj = {
    username: req.body.username,
    profilePicURL: req.body.profilePicURL,
    name: req.body.name,
    bio: req.body.bio,
    followers: [],
    following: [],
  };
  db_connect.collection("users").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

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
