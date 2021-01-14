var router = require("express").Router();
var cloudinary = require("cloudinary").v2;
require("dotenv").config();

//configure the cloudinary connection
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

//upload the image
router.post("/upload", (req, res) => {
  console.log(req.body);
  //upload a preset image
  //gotta find a way to get image file path
  cloudinary.uploader.upload("./public/js/Pog.png", (error, result) => {
    console.log("Result", result);
    console.log("error", error);
    if (error) {
      res.status(500).json(error);
      return;
    }
    console.log(result.url); // this will return the url of the image, use this in the post
    res.status(200).json(result);
  });
});

module.exports = router;
