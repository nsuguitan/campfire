const express = require("express");

const postRoutes = express.Router();

const dbo = require("../db/conn");
//const uploadImage = require("../services/ImageUpload");

const ObjectId = require("mongodb").ObjectId;

//for getting a list of all posts
postRoutes.route("/posts").get(function (req, res) {
  let db_connect = dbo.getDb("posts");
  db_connect
    .collection("posts")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

//for getting one post by ID
postRoutes.route("/posts/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("posts").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

//for creating a new post and writing to s3
postRoutes.route("/posts/add/userId/:userId").post(function (req, response) {
  let db_connect = dbo.getDb();

  let myobj = {
    author: {
      username: req.body.author.username,
      profilePicURL: req.body.author.profilePicURL,
    },
    postDate: req.body.postDate,
    photoURL: req.body.photoURL,
  };
  db_connect.collection("posts").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

//for getting all posts related to a user
postRoutes.route("/posts/user/:username").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { "author.username": "thisistest" };
  db_connect
    .collection("posts")
    .find(myquery)
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

module.exports = postRoutes;
