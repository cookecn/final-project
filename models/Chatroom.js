const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatroomSchema = new Schema({
    name: {
        type: String
    }
})

module.exports = Chatroom = mongoose.model('chatrooms', ChatroomSchema);