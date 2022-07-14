const express = require("express");

const commentsRoutes = express.Router();

const dbo = require("../db/conn");

const ObjectId = require("mongodb").ObjectId;

//for getting a list of all comments
commentsRoutes.route("/comments").get(function (req, res) {
  let db_connect = dbo.getDb("comments");
  db_connect
    .collection("comments")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

//get metrics for user comments
commentsRoutes.route("/comments/user/:username").get(function (req, res) {
  let db_connect = dbo.getDb("");
  db_connect
    .collection("comments")
    .aggregate([
      { $match: { commentUsername: req.params.username } },
      {
        $group: {
          _id: null,
          totalRating: { $sum: "$commentRating" },
          count: { $sum: 1 },
        },
      },
    ])
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

//for getting a list of all comments with a given postId
commentsRoutes.route("/comments/post/:postId").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { postId: ObjectId(req.params.postId) };
  db_connect
    .collection("comments")
    .find(myquery)
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

//for getting one comment by ID
commentsRoutes.route("/comments/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("comments").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

//for creating a comment document in mongo
commentsRoutes.route("/comments/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    postId: ObjectId(req.body.postId),
    commentText: req.body.commentText,
    commentUsername: req.body.commentUsername,
    commentRating: req.body.commentRating,
  };
  db_connect.collection("comments").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

module.exports = commentsRoutes;
