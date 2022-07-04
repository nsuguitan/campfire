// const aws = require("aws-sdk");
// const multer = require("multer");
// const multerS3 = require("multer-s3");

// const s3 = new aws.S3();

// //now we load our service user credentials
// aws.config.update({
//   secretAccessKey: process.env.S3_ACCESS_SECRET,
//   accessKeyId: process.env.S3_ACCESS_KEY,
//   region: "us-east-1",
// });

// //setup image

// const uploadImage = async (filename, blob) =>
//   await s3.upload({
//     Bucket: process.env.AWS_S3_BUCKET_NAME,
//     Key: filename,
//     Body: blob,
//   });

// module.exports = uploadImage;
