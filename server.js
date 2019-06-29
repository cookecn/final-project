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
const stream = require('getstream');

client = stream.connect(process.env.GETSTREAM_APP_KEY, process.env.GETSTREAM_APP_SECRET, process.env.GETSTREAM_APP_ID);


const userToken = client.createUserToken('the-user-id');
console.log("the user token is: " + userToken);

const feed = client.feed('timeline', 'feed');
feed.addActivity({
    'actor': client.user('the-user-id').ref(),
    'verb': 'post',
    'object': 'I love this picture',
    'attachments': {
        'og': {
            'title': 'Crozzon di Brenta photo by Lorenzo Spoleti',
            'description': 'Download this photo in Italy by Lorenzo Spoleti',
            'url': 'https://unsplash.com/photos/yxKHOTkAins',
            'images': [
                {
                    'image': 'https://goo.gl/7dePYs'
                }
            ]
        }
    }
});


/*const colbyFeed = client.feed('user', 'colby', process.env.GETSREAM_APP_TOKEN);

colbyFeed.addActivity({
  actor: 'colby',
  verb: 'tweet',
  tweet: 'Hello, World',
  object: 1
});



async () => {
  await client.setUser({
  name: "Colby Cooke",
  occupation: "Software Developer",
  gender: "male"
  })
};

client.user("john-doe").getOrCreate({
  name: "John Doe",
  occupation: "Farmer",
  gender: "male"
})

client.user('john-doe').get();

const streamNode = require('getstream-node');
const streamMongoose = new streamNode.MongooseBackend()
streamMongoose.enrichActivities(activities).then(function(enrichedActivities) {
    console.log(enrichedActivities)
}).catch(function(err) {
    console.log('error', err)
});

/*const followUser = (username, following) => {
  const timelineFeed = client.feed('timeline', username);
  timelineFeed.follow('user', following);
};

const getTimelineFeed = (username) => {
  const timelineFeed = client.feed('timeline', username);
  return timelineFeed.get({
    limit: 10,
    reactions: {
      counts: true,
    },
  }).then((result) => {
    return result;
  });
};

const addPostActivity = (username, postId, postTitle, timestamp) => {
  const userFeed = client.feed('user', username);
  return userFeed.addActivity({
    actor: username,
    verb: 'post',
    object: postId,
    foreign_id: `post:${postId}`,
    postTitle,
    timestamp,
  });
};

const addReaction = (username, type, postActivityId) => {
  const userClient = getClient();

  const reactions = client.reactions.filter({
    'avitivity_id': postActivityId
  });

  return userClient.reactions.add(type, postActivityId, {
    actor: username,
    timestamp: new Date().getTime(),
  });

};*/


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
