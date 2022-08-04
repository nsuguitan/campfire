const express = require("express");

const userRoutes = express.Router();

const dbo = require("../db/conn");

const ObjectId = require("mongodb").ObjectId;

const USERS_COLLECTION = "users";

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

//update followers for a user
userRoutes.route("/users/:username/followers").post((req, res) => {
  let db_connect = dbo.getDb();
  let myquery = { username: req.params.username };
  let isFollower = req.body.isFollower;

  const updateFollower = isFollower
    ? {
      $pull: { followers: req.body.follower },
    }
    : {
      $push: { followers: req.body.follower },
    };

  db_connect
    .collection(USERS_COLLECTION)
    .updateOne(myquery, updateFollower, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

//update following for a user
userRoutes.route("/users/:username/following").post((req, res) => {
  let db_connect = dbo.getDb();
  let myquery = { username: req.params.username };
  let isFollowing = req.body.isFollowing;

  const updateFollowing = isFollowing
    ? {
      $pull: { following: req.body.following },
    }
    : {
      $push: { following: req.body.following },
    };

  db_connect
    .collection(USERS_COLLECTION)
    .updateOne(myquery, updateFollowing, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

//Pulls a list of all users
userRoutes.route("/users").get(function (req, res) {
  let db_connect = dbo.getDb("users");
  db_connect
    .collection("users")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

module.exports = userRoutes;
