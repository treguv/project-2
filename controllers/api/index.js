const router = require("express").Router();

const userRoutes = require("./user-routes.js");
const postRoutes = require("./post-routes");
const commentRoutes = require("./comment-routes");
// const uploadRoutes = require("./aws-routes.js");

// prefixes routes
router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);
//aws upload image routes
// router.use("/upload", uploadRoutes);

module.exports = router;
