const router = require('express').Routes(); 
const sequelize = require("../../config/connection"); 
const { Post, User, Comment, Like } = require('../../models'); 