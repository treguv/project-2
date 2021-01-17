const router = require("express").Router();

const userRoutes = require("./user-routes.js");
const postRoutes = require("./post-routes");
const commentRoutes = require("./comment-routes");
const likedPostRoutes = require('./liked-posts-routes');
// const uploadRoutes = require("./aws-routes.js");
const imageRoutes = require("./image-routes.js");

// prefixes routes
router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);
router.use("/liked", likedPostRoutes); 
//cloudinary
router.use("/images", imageRoutes);
//aws upload image routes
// router.use("/upload", uploadRoutes);

module.exports = router;
