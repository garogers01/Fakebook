var express = require('express');
var router = express.Router();
var usersDb = require('../db/users');
var userPostsDb = require('../db/userPosts');
var checkValidUser = require('../middlewares/checkValidUser');


router.get('/friends/:email/:personName', function (req, res, next) {
  usersDb.getFriendsOfUser(req.params.email, function (err, friends) {
    var userFriends = [];
    if (err) {

    } else {

      for (var i = 0; i < friends.length; i++) {


        userFriends.push({
          personName: friends[i].personName,
          email: friends[i].email
        });



      }
      req.session.allFriends = userFriends;
      res.render('friends', {
        errorMessage: req.session.errorMessage,
        personName: req.session.personName,
        email: req.session.email,
        allFriends: req.session.allFriends
      });


    }
  });

});


module.exports = router;