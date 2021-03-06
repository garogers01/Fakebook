var express = require('express');
var helpers = require('express-helpers');
var app = express();
helpers(app);
var uuid = require('node-uuid');
var User = require('./db/users.js');
var handleError = require('./middlewares/handleError');
var pageNotFound = require('./middlewares/pageNotFound');
var isAuthenticated = require('./middlewares/isAuthenticated');

app.engine('html', require('ejs').__express);
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('index');
});


var generateCookieSecret = function () {
  return 'iamasecret' + uuid.v4();
};

var cookieSession = require('cookie-session');
app.use(cookieSession({
  secret: generateCookieSecret()
}));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: false
}));




var loginRouter = require('./routes/login');
app.use('/', loginRouter);
var profileRouter = require('./routes/profile');
app.use('/', profileRouter);
var allRouter = require('./routes/all');
app.use('/', allRouter);
var friendsRouter = require('./routes/friends');
app.use('/', friendsRouter);
var feedRouter = require('./routes/feed');
app.use('/', feedRouter);
var suggestionsRouter = require('./routes/suggestions');
app.use('/', suggestionsRouter);
var similarRouter = require('./routes/similar');
app.use('/', similarRouter);
var settingsRouter = require('./routes/settings');
app.use('/', settingsRouter);

app.get('/userHomePage/:email/:personName', function (req, res) {
  User.findUser(req.body.email, function (err2, user) {
    if (err2) {
      res.send('error' + err2);
    } else {
      if (!req.session.email || req.session.email === '') {
        res.send('You tried to access a protected page');
      }
      req.session.personName = req.body.personName;
      req.session.email = req.body.email;
      req.session.usersFriends = [];
      req.session.homePosts = [];
      req.session.interests = [];
      req.session.user = user;
      res.redirect('/feed/' + req.session.email + '/' + req.session.personName);
    }
  });


});

app.get('/logout', function (req, res) {
  req.session.personName = '';
  req.session.email = '';
  req.session.errorMessage = '';
  req.session.user = null;
  req.session.allFriends = [];
  req.session.homePosts = [];
  req.session.myInterests = [];
  res.render('logout');
});

app.get('/register', function (req, res) {
  res.render('createAccount');
});

app.post('/register', function (req, res) {
  User.findUser(req.body.email, function (err2, user) {
    User.addUser(req.body.personName, req.body.email, req.body.password, function (err) {


      if (err) {
        res.send('Unable to register user');
      } else {

        req.session.personName = req.body.personName;
        req.session.email = req.body.email;
        req.session.usersFriends = [];
        req.session.homePosts = [];
        req.session.interests = [];
        req.session.user = user;
        res.redirect('/feed/' + req.session.email + '/' + req.session.personName);


      }

    });

  });
});



app.use(handleError);
app.use(pageNotFound);
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function() {
  console.log('listening');
});


module.exports = app;