
const express = require("express");

const ratingsRoutes = express.Router();

const dbo = require("../db/conn");

const ObjectId = require("mongodb").ObjectId;

//for updating the rating in mongo

ratingsRoutes.route("/ratings/update").post(function (req, response) {
  console.log("serving rating route");
  let db_connect = dbo.getDb();
  // let myobj = {
  //   commentRating: req.body.commentRating,
  // };
  const filter = { _id: ObjectId("62bb4f948f03649b96f3966b") };
  const updatedRating = {
    $set: {
      commentRating: 15,
    },
  };
  const options = { upsert: true };
  db_connect.collection("comments").updateOne(filter, updatedRating, options);
});


module.exports = ratingsRoutes;
