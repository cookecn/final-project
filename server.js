const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users")
const news = require('./routes/api/news');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
require('dotenv').config({ path: '.env' })
const NewsAPI = require('newsapi');
const Pusher = require('pusher');
const cors = require('cors');
const stream = require('getstream');


//GetStream api for feed
client = stream.connect(process.env.GETSTREAM_APP_KEY, process.env.GETSTREAM_APP_SECRET, process.env.GETSTREAM_APP_ID);

//userToken needed for user feed. Still need to connect this user to the database user. So, upon login, user is connected to database with the getstream api activated for that user.
const userToken = client.createUserToken('the-user-id');
console.log("the user token is: " + userToken);

const colbyFeed = client.feed('timeline', 'the-user-id', process.env.GETSREAM_APP_TOKEN);


/*colbyFeed.addActivity({
  username: "Colby",
  actor: 'colby',
  verb: 'tweet',
  tweet: 'Hello, World',
  object: 1
});
/*feed.addActivity({
    'actor': client.user('the-user-id').ref(),
    'verb': 'post',
    'object': 'Testing, testing, 1,2,3',
    'attachments': {
        'og': {
            'title': "In today's news, this is a test!",
            'description': 'If only, if only, it would work like it did yesterday...'
        }
    }
});


const colbyFeed = client.feed('timeline', 'the-user-id', process.env.GETSREAM_APP_TOKEN);

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

client.user('').get();


//mongoose connection for getStream

const streamNode = require('getstream-node');
const streamMongoose = new streamNode.MongooseBackend()
streamMongoose.enrichActivities(activities).then(function(enrichedActivities) {
    console.log(enrichedActivities)
}).catch(function(err) {
    console.log('error', err)
});

//follow another user, boilerplate code
/*const followUser = (username, following) => {
  const timelineFeed = client.feed('timeline', username);
  timelineFeed.follow('user', following);
};

//get another user's timeline feed
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

//news Articles for updating every five seconds using the pusher api.
const pusher = new Pusher({
  appId: process.env.pusherId,
  key: process.env.pusherKey,
  secret: process.env.pusherSecret,
  cluster: process.env.pusherCluster,
  useTLS: true,
});

//newsAPI
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
//const topic = ['gaming', 'environment', 'non-profit', 'social']

app.get('/live', (req, res) => {
  //for (var i = 0, i < topic.length; i++) {
    //topic = [i];
  //}
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
app.use("/api/news", news);
//app.use("/api/messages", messages);

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
server.listen(port, () => console.log(`Server up and running on port ${port} !`));
