const express = require("express");

const postRoutes = express.Router();

const dbo = require("../db/conn");

const POSTS_COLLECTION = "posts";

const ObjectId = require("mongodb").ObjectId;

//for getting a list of all posts
postRoutes.route("/posts").get(function (req, res) {
  let db_connect = dbo.getDb(POSTS_COLLECTION);
  db_connect
    .collection(POSTS_COLLECTION)
    .find({}, { author: 0, postDate: 0, photoURL: 0 })
    .sort({ postDate: -1 })
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

//for getting one post by ID
postRoutes.route("/posts/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection(POSTS_COLLECTION)
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

//for creating a new post
postRoutes.route("/posts/add/userId/:userId").post(function (req, response) {
  let db_connect = dbo.getDb();

  let myobj = {
    author: {
      username: req.body.author.username,
      profilePicURL: req.body.author.profilePicURL,
    },
    postDate: new Date(),
    photoURL: req.body.photoURL,
  };
  db_connect.collection(POSTS_COLLECTION).insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

//for getting all posts related to a user
postRoutes.route("/posts/user/:username").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { "author.username": req.params.username };
  db_connect
    .collection(POSTS_COLLECTION)
    .find(myquery)
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

//for deleting a post
postRoutes.route("/posts/delete/:id").delete(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection(POSTS_COLLECTION).deleteOne(myquery, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

module.exports = postRoutes;
