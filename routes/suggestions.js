var express = require('express');
var router = express.Router();
var usersDb = require('../db/users');
var userPostsDb = require('../db/userPosts');
var checkValidUser = require('../middlewares/checkValidUser');


router.get('/suggestions/:email/:personName', function(req, res, next) {
  usersDb.getAllUsers(function(err, users) {
    usersDb.getFriendsOfUser(req.params.email, function(err, friends) {
      
var userFriends = [];
      if (err) {

      } else {

         for (var i = 0; i < friends.length; i++) {


        userFriends.push({
          personName: friends[i].personName,
          email: friends[i].email,
          friends: friends[i].friends
        });



      }

      req.session.allFriends = userFriends;
              
        var notFriends = [];
        for (var j = 0; j < users.length; j++) {
          isFriends = false;
          if ((users[j].email == req.params.email) || (users[j].email == req.session.email)) {
            isFriends = true;
          }
          for (var k = 0; k < userFriends.length; k++) {

            if ((users[j].email == userFriends[k].email)) {
              isFriends = true;
              break;
            }


          }

          var theFriends = [];
          if (users[j].friends) {
            theFriends = users[j].friends;
          }

          if (!isFriends) {
           notFriends.push({
            personName: users[j].personName,
            email: users[j].email,
            friends: theFriends
          });

         }


       }

       var toSuggest = [];
       for (var t = 0; t < notFriends.length; t++) {
        var count = 0;
        for (var s = 0; s < theFriends.length; s++) {
          for (var u = 0; u < friends.length; u++) {
            if (theFriends[s].email == friends[u].email) {
              count++;
            }
          }
        }
        if (count >= 2) {
           toSuggest.push({
            personName: notFriends[t].personName,
            email: notFriends[t].email
          });
        }
       }

       req.session.allSuggestions = toSuggest;
       res.render('suggestions', {
        errorMessage: req.session.errorMessage,
        personName: req.session.personName,
        email: req.session.email,
        allSuggestions: req.session.allSuggestions
      });

     }





   });
  });

});


module.exports = router;