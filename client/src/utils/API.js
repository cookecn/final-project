import axios from "axios";

export default {
    //Gets all messages
    getMessages: function() {
        return axios.get('/api/messages');
    },
    getMessage: function(id) {
        return axios.get('/api/messages/' + id);
    },
    deleteMessage: function(id) {
        return axios.delete('/api/messages/' + id);
    },
    saveMessage: function(messageData) {
        return axios.post("/api/messages", messageData);
    }
};