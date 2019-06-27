import axios from "axios";

export default {
    //Gets all messages
    getMessages: function() {
        return axios.get('/api/messages');
    },
    getMessage: function(id) {
        return axios.get('/messages/' + id);
    },
    deleteMessage: function(id) {
        return axios.delete('/messages/' + id);
    },
    saveMessage: function(messageData) {
        return axios.post("/messages", messageData);
    }
};