var express = require('express');
var router = express.Router();
var userPostsDb = require('../db/userPosts');
var usersDb = require('../db/users');
var checkValidUser = require('../middlewares/checkValidUser');

router.get('/profile/:email/:personName', function (req, res, next) {
  if (!req.session.errorMessage || req.session.errorMessage === '') {
    req.session.errorMessage = '';
  }

  userPostsDb.getUserPostsByUser(req.params.email, function (err, allUserPosts) {

    usersDb.getFriendsOfUser(req.session.email, function (err, friends) {
      req.session.usersFriends = friends;
      req.session.isFriends = false;
      var listOfFriends = req.session.usersFriends;
      for (var i = 0; i < listOfFriends.length; i++) {
        if (listOfFriends[i].email == req.params.email) {
          req.session.isFriends = true;
        }
      }

      req.session.myPosts = allUserPosts;
      if (!allUserPosts || allUserPosts === '') {
        req.session.myPosts = [];
      } else {
        req.session.myPosts = allUserPosts;
      }
      if (req.session.usersFriends.length == 0) {
        req.session.isFriends == false;
      }
      res.render('profile', {
        errorMessage: req.session.errorMessage,
        personName: req.params.personName,
        userName: req.session.personName,
        personEmailName: req.params.email,
        myPosts: req.session.myPosts,
        isFriends: req.session.isFriends,
        email: req.session.email
      });

    });
  });



});

router.post('/profile/:email/:personName', function (req, res, next) {
  if (req.params.email == req.session.email) {
    userPostsDb.addUserPost(req.params.email, req.body.text, req.params.personName, function (err) {
      if (err) {
        res.send('error' + err);
      } else {
        res.redirect('/profile/' + req.params.email + '/' + req.params.personName);
      }
    });
  } else {
    if (req.session.usersFriends.length == 0) {
      usersDb.addFriendToUser(req.session.email, req.params.email, req.params.personName, function (err, result) {
        usersDb.addFriendToUser(req.params.email, req.session.email, req.session.personName, function (err, result) {
          usersDb.getFriendsOfUser(req.session.email, function (err, friends) {
            req.session.usersFriends = friends;
            req.session.isFriends = true;
            res.redirect('/profile/' + req.params.email + '/' + req.params.personName);
          });
        });
      });
    } else {
      var doesNotHaveFriend = true;
      var listOfFriends = req.session.usersFriends;
      for (var i = 0; i < listOfFriends.length; i++) {
        if (listOfFriends[i].email == req.params.email) {
          doesNotHaveFriend = false;
        }
      }
      if (doesNotHaveFriend) {
        usersDb.addFriendToUser(req.session.email, req.params.email, req.params.personName, function (err, result) {
          usersDb.addFriendToUser(req.params.email, req.session.email, req.session.personName, function (err, result) {
            usersDb.getFriendsOfUser(req.session.email, function (err, friends) {
              req.session.usersFriends = friends;
              req.session.isFriends = true;
              res.redirect('/profile/' + req.params.email + '/' + req.params.personName);
            });
          });
        });
      } else {

        usersDb.deleteFriendToUser(req.session.email, req.params.email, req.params.personName, function (err, result) {
          usersDb.deleteFriendToUser(req.params.email, req.session.email, req.session.personName, function (err, result) {
            usersDb.getFriendsOfUser(req.session.email, function (err, friends) {
              req.session.usersFriends = friends;
              req.session.isFriends = false;
              res.redirect('/profile/' + req.params.email + '/' + req.params.personName);
            });
          });
        });
      }

    }


  }

});

module.exports = router;