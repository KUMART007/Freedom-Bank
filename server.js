if(process.env.NODE !== 'production'){
  require("dotenv").config();
}

var express = require("express");
var exphbs = require("express-handlebars");
var flash = require('express-flash');
var db = require("./models");
var app = express();
var passport = require("passport");
var session = require('express-session')

var PORT = process.env.PORT || 3000;
require('./config/passport.js')(passport, db.user)
// Middleware

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
      expires: 600000
  }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static("public"));
app.use(flash());

// Handlebars
app.engine( 'handlebars', exphbs( { 
  extname: 'handlebars', 
  defaultLayout: 'main', 
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
} ) );
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app,passport);
require("./routes/htmlRoutes")(app,passport);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
