const User = require("./User");
const Post = require("./Post");
const Like = require("./Like");
const Comment = require("./Comment");

// user can have many posts
User.hasMany(Post, {
  foreignKey: "user_id",
});

// post only belongs to one user
Post.belongsTo(User, {
  foreignKey: "user_id",
});

// like belongs to one user
Like.belongsTo(User, {
  foreignKey: "user_id",
});

// like only one post
Like.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "cascade"
});

// user can like many posts
User.hasMany(Like, {
  foreignKey: "user_id",
});

// post can have many likes
Post.hasMany(Like, {
  foreignKey: "post_id",
  onDelete: "cascade"
});

// models will be connected through the Like model
User.belongsToMany(Post, {
  through: Like,
  as: "liked_posts",
  foreignKey: "user_id",
});

Post.belongsToMany(User, {
  through: Like,
  as: "liked_posts",
  foreignKey: "post_id",
});

// comment belongs to one user
Comment.belongsTo(User, {
  foreignKey: "user_id",
});

// comment left on one post
Comment.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "cascade"
});

// user can leave many comments
User.hasMany(Comment, {
  foreignKey: "user_id",
});

// post can have many comments
Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "cascade"
});

module.exports = { User, Post, Like, Comment };
