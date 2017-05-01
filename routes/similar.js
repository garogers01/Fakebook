var express = require('express');
var router = express.Router();
var usersDb = require('../db/users');
var userPostsDb = require('../db/userPosts');
var checkValidUser = require('../middlewares/checkValidUser');


router.get('/similar/:email/:personName', function(req, res, next) {
  usersDb.getAllUsers(function(err, users) {
    usersDb.getInterestsOfUser(req.params.email, function (err, userInterests) {
    usersDb.getFriendsOfUser(req.params.email, function(err, friends) {
      req.session.email = req.params.email;
var userFriends = [];
      if (err) {

      } else {

         for (var i = 0; i < friends.length; i++) {


        userFriends.push({
          personName: friends[i].personName,
          email: friends[i].email,
          friends: friends[i].friends,
          interests: friends[i].interests
        });



      }


              
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
          var currentUser = users[j];
          
          for (var z = 0; z < currentUser.friends.length; z++) {

           theFriends.push({
          personName: currentUser.friends[z].personName,
          email: currentUser.friends[z].email,
        });

          }

          if (!isFriends) {
           notFriends.push({
            personName: users[j].personName,
            email: users[j].email,
            friends: users[j].friends,
            interests: users[j].interests
          });

         }


       }

       var toSuggest = [];
       for (var t = 0; t < notFriends.length; t++) {
        var count = 0;
     
        for (var s = 0; s < notFriends[t].interests.length; s++) {
          for (var u = 0; u < userInterests.length; u++) {
            if (notFriends[t].interests[s] == userInterests[u]) {
              count++;
            }
          }
        }
           if (count >= 1) {
           toSuggest.push({
            personName: notFriends[t].personName,
            email: notFriends[t].email,
            number: count
          });
        }

       }

       req.session.allSuggestionsSimilar = toSuggest;
       res.render('similar', {
        errorMessage: req.session.errorMessage,
        personName: req.session.personName,
        email: req.session.email,
        allSuggestions: req.session.allSuggestionsSimilar
      });

     }





   });
  });
});
});


module.exports = router;