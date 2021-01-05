const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    active:Boolean,
    createdOn:{
      type: Date,
      default: Date.now
    },
  })
);

module.exports = User;