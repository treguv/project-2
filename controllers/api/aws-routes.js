const router = require("express").Router();
require("dotenv").config();
//multer is a package that handles file uploads
const multer = require("multer");
//amazon web services dev kit
const AWS = require("aws-sdk");
//generate unique file names
const { v4: uuid } = require("uuid");

// create instance of s3 which is the file storage platform AWS provides
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
});
//create mem storage object
const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, ""); //null, path of where to save file
  },
});
// middleware
//image is the key we use when uploading
const upload = multer({ storage }).single("image");

//upload image to aws
router.post("/", upload, (req, res) => {
  console.log(req.file); //file is one file, files is multiple
  let myFile = req.file.originalname.split(".");
  const fileType = myFile[myFile.length - 1]; // get the type of the file
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME, // name of the s3 bucket
    Key: `${uuid()}.${fileType}`, // think of it like {key: value}
    Body: req.file.buffer,
  };
  // res.send({
  //   message: "Uploading File!",
  // });
  //upload file to s3 bucket
  s3.upload(params, (error, data) => {
    //data constains link to the file
    if (error) {
      res.status(500).send(error);
      return;
    }

    res.status(200).send(data);
  });
});

module.exports = router;
