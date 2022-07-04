const express = require("express");

const postRoutes = express.Router();

const dbo = require("../db/conn");
const uploadImage = require("../services/ImageUpload");

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
  console.log("New Post Route Triggered");
  let db_connect = dbo.getDb();

  let result = "test-file.png";
  console.log("Generated Filename: ", result);
  console.log("BLOB: ", req.body.image);
  let uploadedImage = uploadImage(result, req.body.image);

  let myobj = {
    author: {
      username: "Test",
      profilePicURL: "http://placecorgi.com/260/180",
    },
    postDate: new Date(),
    photoURL: uploadedImage.Location,
  };
  db_connect.collection("posts").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

module.exports = postRoutes;
