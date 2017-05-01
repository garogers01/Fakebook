var express = require('express');
var router = express.Router();
var userPostsDb = require('../db/userPosts');
var usersDb = require('../db/users');
var checkValidUser = require('../middlewares/checkValidUser');

router.get('/profile/:email/:personName', function (req, res, next) {

  userPostsDb.getUserPostsByUser(req.params.email, function (err, allUserPosts) {
  usersDb.findUser(req.session.email, function (errrr, forUserName) {
    usersDb.getFriendsOfUser(req.session.email, function (err8, friends) {
      usersDb.getFriendsOfUser(req.params.email, function (err9, friendsProfile) {
        usersDb.getInterestsOfUser(req.session.email, function (err10, myInterests) {
          usersDb.getInterestsOfUser(req.params.email, function (err11, friendsInterests) {
        

        req.session.profileFriends = friendsProfile;
        req.session.interests = myInterests;
        req.session.friendsInterests = friendsInterests;
        req.session.usersFriends = friends;
        req.session.isFriends = false;
        var listOfFriends = friends;

        for (var i = 0; i < friends.length; i++) {
          if (friends[i].email == req.params.email) {
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

        req.session.personName = forUserName.personName;

        res.render('profile', {
          errorMessage: req.session.errorMessage,
          personName: req.params.personName,
          userName: req.session.personName,
          personEmailName: req.params.email,
          myPosts: req.session.myPosts,
          isFriends: req.session.isFriends,
          usersFriends: req.session.usersFriends,
          email: req.session.email,
          profileFriends: req.session.profileFriends,
          myInterests: req.session.interests,
          friendsInterests: req.session.friendsInterests
        });
         });
    });
      });
      });
    });
  });



});

router.post('/profile/:email/:personName', function (req, res, next) {
  if (req.params.email == req.session.email) {
    userPostsDb.addUserPost(req.params.email, req.body.text, req.params.personName, function (err) {
      usersDb.getFriendsOfUser(req.session.email, function (err, friends) {
        if (err) {
          res.send('error' + err);
        } else {
          req.session.usersFriends = friends;
          res.redirect('/profile/' + req.params.email + '/' + req.params.personName);
        }
      });
    });
  } else {
    if (req.session.usersFriends.length == 0) {
      usersDb.getInterestsOfUser(req.session.email, function (err, myInterests) {
          usersDb.getInterestsOfUser(req.params.email, function (err, friendsInterests) {
      usersDb.addFriendToUser(req.session.email, req.params.email, req.params.personName, friendsInterests, function (err, result) {
        usersDb.addFriendToUser(req.params.email, req.session.email, req.session.personName, myInterests, function (err, result) {
          usersDb.getFriendsOfUser(req.session.email, function (err, friends) {
            usersDb.getFriendsOfUser(req.params.email, function (err, friendsProfile) {
              req.session.profileFriends = friendsProfile;
              req.session.usersFriends = friends;
              req.session.isFriends = true;
              res.redirect('/profile/' + req.params.email + '/' + req.params.personName);
            });
            });
        });
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
        usersDb.getInterestsOfUser(req.params.email, function (err, friendsInterests) {
        usersDb.getInterestsOfUser(req.session.email, function (err1, myInterests) {
        usersDb.addFriendToUser(req.session.email, req.params.email, req.params.personName, friendsInterests, function (err2, result) {
          usersDb.addFriendToUser(req.params.email, req.session.email, req.session.personName, myInterests, function (err3, result) {
            usersDb.getFriendsOfUser(req.session.email, function (err4, friends) {
              usersDb.getFriendsOfUser(req.params.email, function (err5, friendsProfile) {
                req.session.profileFriends = friendsProfile;
                req.session.usersFriends = friends;
                req.session.isFriends = true;
                req.session.friendsInterests = friendsInterests;
                res.redirect('/profile/' + req.params.email + '/' + req.params.personName);
              });
              });
        });
            });
          });
        });
      } else {

        usersDb.deleteFriendToUser(req.session.email, req.params.email, req.params.personName, function (err7, result) {
          usersDb.deleteFriendToUser(req.params.email, req.session.email, req.session.personName, function (err9, result) {
            usersDb.getFriendsOfUser(req.session.email, function (err10, friends) {
              usersDb.getFriendsOfUser(req.params.email, function (err11, friendsProfile) {
                 usersDb.getInterestsOfUser(req.params.email, function (err12, friendsInterests) {
                req.session.profileFriends = friendsProfile;
                req.session.usersFriends = friends;
                req.session.isFriends = false;
                req.session.friendsInterests = friendsInterests;
                res.redirect('/profile/' + req.params.email + '/' + req.params.personName);
              });
                  });
            });
          });
        });
      }

    }


  }

});

module.exports = router;