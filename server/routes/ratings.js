
const express = require("express");

const ratingsRoutes = express.Router();

const dbo = require("../db/conn");

const ObjectId = require("mongodb").ObjectId;

//for updating the rating in mongo

ratingsRoutes.route("/ratings/update").post(function (req, response) {
  let db_connect = dbo.getDb();

  const filter = { _id: ObjectId(req.body.commentId) };
  //Next Steps
    //Make filter dynamic
    //set to varable for rating instead on 31
  //req.body.postID creates new item-> does not update
  //updating on frontend but not initial feild
  //useEffect for updating the rating with a depedencie of set rating/rating
  const updatedRating = {
    $set: {
      commentRating: req.body.commentRating,
    },
  };
  const options = { upsert: true };
  db_connect.collection("comments").updateOne(filter, updatedRating, options);
});


module.exports = ratingsRoutes;
