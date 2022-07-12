const express = require("express");

const ratingsRoutes = express.Router();

const dbo = require("../db/conn");

const ObjectId = require("mongodb").ObjectId;

//for updating the rating in mongo
ratingsRoutes.route("/ratings/update").post(function (req, res) {
  let db_connect = dbo.getDb();
  const filter = { _id: ObjectId(req.body.commentId) };
  //Current Status
  //writes and reads ratings to monogo
  //Issue is that you can only do it once so I need to find a way to use the updated rating and not the initial rating. Jory suggestd maybe using a useEffect but wasn't sure
  const updatedRating = {
    $set: {
      commentRating: req.body.commentRating,
    },
  };

  const options = { upsert: true };
  db_connect
    .collection("comments")
    .updateOne(filter, updatedRating, options, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

module.exports = ratingsRoutes;
