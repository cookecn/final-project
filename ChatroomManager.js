const chatroomTemplates = require('./models/Chatroom');
const Chatroom = require('./Chatroom');

module.exports = function() {
    const chatrooms = new Map()

    function removeClient(client) {
        chatrooms.forEach(c => c.removeUser(client))
    }

    function getChatroomByName(chatroomName) {
        return chatrooms.get(chatroomName)
    }

    function serializeChatrooms() {
        return Array.from(chatrooms.values()).map(c => c.serialize());
    }

    return {
        removeClient,
        getChatroomByName,
        serializeChatrooms
    }
}