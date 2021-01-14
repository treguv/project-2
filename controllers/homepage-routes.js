const router = require("express").Router();

// renders homepage.handlebars template
router.get("/", (req, res) => {
  res.render("homepage");
});

//render the image test page
router.get("/image", (req, res) => {
  res.render("image-upload");
});
module.exports = router;
