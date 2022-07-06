
const express = require("express");

const ratingsRoutes = express.Router();

const dbo = require("../db/conn");

const ObjectId = require("mongodb").ObjectId;

//for updating the rating in mongo
ratingsRoutes.route("/ratings/update").post(function (req) {
    console.log('serving rating route')
    let db_connect = dbo.getDb();
    let myobj = {
      commentRating: req.body.commentRating,
      _id: ObjectId('62bb4f948f03649b96f3966b')
    };
    let filter= myobj._id
    let updatedRating = {
        $set:{
            commentRating: 15
        },
    };
    db_connect.collection("comments").updateOne(filter, updatedRating);
  });



  module.exports = ratingsRoutes;