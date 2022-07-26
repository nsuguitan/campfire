const express = require("express");

const commentsRoutes = express.Router();

const dbo = require("../db/conn");

const ObjectId = require("mongodb").ObjectId;

const COMMENTS_COLLECTION = "comments";

/**
 * 1. Get a list if all comments
 * 2. Get metrics for user comments
 * 3. Get a list of all comments with a given postId
 * 4. Get one comment by Id
 * 5. Create a comment object in mongo
 * 6. Delete comments related to post
 */

commentsRoutes.route("/comments").get((req, res) => {
  let db_connect = dbo.getDb("comments");
  db_connect
    .collection(COMMENTS_COLLECTION)
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

commentsRoutes.route("/comments/user/:username").get((req, res) => {
  let db_connect = dbo.getDb("");
  db_connect
    .collection(COMMENTS_COLLECTION)
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
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

commentsRoutes.route("/comments/post/:postId").get((req, res) => {
  let db_connect = dbo.getDb();
  let myquery = { postId: ObjectId(req.params.postId) };
  db_connect
    .collection(COMMENTS_COLLECTION)
    .find(myquery)
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

commentsRoutes.route("/comments/:id").get((req, res) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection(COMMENTS_COLLECTION).findOne(myquery, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

commentsRoutes.route("/comments/add").post(function (req, res) {
  let db_connect = dbo.getDb();
  let myobj = {
    postId: ObjectId(req.body.postId),
    commentText: req.body.commentText,
    commentUsername: req.body.commentUsername,
    commentRating: req.body.commentRating,
  };
  db_connect.collection(COMMENTS_COLLECTION).insertOne(myobj, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

commentsRoutes.route("/comments/delete/post/:postId").delete((req, res) => {
  let db_connect = dbo.getDb();
  let my_query = { postId: ObjectId(req.params.postId) };
  db_connect
    .collection(COMMENTS_COLLECTION)
    .deleteOne(my_query, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

module.exports = commentsRoutes;
