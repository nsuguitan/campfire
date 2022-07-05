const express = require("express");

const ratingsRoutes = express.Router();

const dbo = require("../db/conn");

const ObjectId = require("mongodb").ObjectId;

//for updating the rating in mongo
commentsRoutes.route("/rating/update").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
      postId: ObjectId(req.body.postId),
      commentText: req.body.commentText,
      commentUsername: req.body.commentUsername,
      commentRating: req.body.commentRating,
    };
    db_connect.collection("ratings").updateOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
  });

  module.exports = ratingsRoutes;