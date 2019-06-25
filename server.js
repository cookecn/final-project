const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const messages = require('./models/Message');
const users = require("./routes/api/users")
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const ioClient = require('socket.io-client');

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
app.use("/api/messages", messages);


io.on('conenction', (socket) => {
  console.log('a user is connected');
  socket.emit('message', { hello: 'world' });
  socket.on('message', function(addMessage) {
    console.log(addMessage);
  })
});

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
server.listen(port, () => console.log(`Server up and running on port ${port} !`));
