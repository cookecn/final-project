const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const MessageSchema = new Schema({
    message: {
        type: String
    },
    date: {
        type: String,
        default: Date.now
    }
  });
  module.exports = Message = mongoose.model("messages", MessageSchema);