var express = require('express');
var app = express();
var port = 9005;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var cors = require("cors");

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var config = require('./src/configs/database');
var url = config.url;
var connect = mongoose.connect(url, {
  useNewUrlParser: true
});

connect.then((db) => {
  console.log("Connected correctly to server");
}, (err) => { console.log(err); });

require('./src/configs/passport')(passport);

app.use(session({
  secret: 'verysecretkey',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000 },
  user: {}
}));

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.set('view engine', 'ejs');

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./src/controllers/authController.js')(app, passport);

app.listen(port);