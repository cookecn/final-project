const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users")
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const ClientManager = require('./ClientManager');
const ChatroomManager = require('./ChatroomManager');
const makeHandlers = require('./Handlers');
const ioClient = require('socket.io-client');
require('dotenv').config({ path: '.env' })
const NewsAPI = require('newsapi');
const Pusher = require('pusher');
const cors = require('cors');

const clientManager = ClientManager();
const chatroomManager = ChatroomManager();

const pusher = new Pusher({
  appId: process.env.pusherId,
  key: process.env.pusherKey,
  secret: process.env.pusherSecret,
  cluster: process.env.pusherCluster,
  useTLS: true,
});

const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

const fetchNews = (searchTerm, pageNum) => 
  newsapi.v2.everything({
    q: searchTerm,
    language: 'en',
    page: pageNum,
    pageSize: 10,
  });

app.use(cors());

function updateFeed(topic) {
  let counter = 2;
  //setInterval(() => {
    fetchNews(topic, counter)
    .then(response => {
        const articleString = JSON.stringify(response.articles);
        pusher.trigger('news-channel', 'update-news', articleString);
      counter += 1;
    })
    .catch(err => console.log(err));
  }//, 5000);
//}

app.get('/live', (req, res) => {
  const topic = 'gaming';
  fetchNews(topic, 1)
  .then(response => {
    res.json(response.articles);
    updateFeed(topic);
  })
  .catch(err => console.log(err));
})


// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());


// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

  // Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Routes
app.use("/api/users", users);
//app.use("/api/messages", messages);


io.on('connection', (client) => {
  const {
    handleRegister,
    handleJoin,
    handleLeave,
    handleMessage,
    handleGetChatrooms,
    handleGetAvailableUsers,
    handleDisconnect
  } = makeHandlers(client, clientManager, chatroomManager)
  console.log('client is connected at: ', client.id);
  clientManager.addClient(client);
  client.on('register', handleRegister);
  client.on('join', handleJoin);
  client.on('leave', handleLeave);
  client.on('message', handleMessage);
  client.on('chatrooms', handleGetChatrooms);
  client.on('availableUsers', handleGetAvailableUsers);

  client.on('disconnect',  function() {
    console.log('client disconnect', client.id);
    handleDisconnect();
  });

  client.on('error', function (err) {
    console.log('received error from client:', client.id);
    console.log(err);
  });
});

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
server.listen(port, () => console.log(`Server up and running on port ${port} !`));
