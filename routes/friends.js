var express = require('express');
var router = express.Router();
var usersDb = require('../db/users');
var userPostsDb = require('../db/userPosts');
var checkValidUser = require('../middlewares/checkValidUser');


router.get('/friends/:email/:personName', function (req, res, next) {
  usersDb.getInterestsOfUser(req.params.email, function (err, userInterests) {
  usersDb.getFriendsOfUser(req.params.email, function (err, friends) {
    var userFriends = [];
    if (err) {

    } else {



      for (var i = 0; i < friends.length; i++) {
        /*var theInterestsOfFriend = [];
        for (var b = 0; b < friends[i].interests.length; b++) {
          theInterestsOfFriend.push(friends[b]);
        }*/
        userFriends.push({
          personName: friends[i].personName,
          email: friends[i].email,
          interests: friends[i].interests
        });
      }

      var notInterest = [];
      for (var k = 0; k < userFriends.length; k++) {
        for (var z = 0; z < userFriends[k].interests.length; z++) {
        var isInterest = false;
        for (var j = 0; j < userInterests.length; j++) {
          if (userInterests[j] == userFriends[k].interests[z]) {
            isInterest = true;
          }
        }
        if (!isInterest) {
          notInterest.push(userFriends[k].interests[z]);
        }

        }
      }

      var suggestsWithCount = [];
      for (var p = 0; p < notInterest.length; p++) {
        var possibleInterest = notInterest[p];
        if (possibleInterest in suggestsWithCount) {
          suggestsWithCount[possibleInterest]++;
        }
        else {
          suggestsWithCount[possibleInterest] = 1;
        }
      }

      var interestSuggestionObject = [];
      for (var prop in suggestsWithCount) {
        interestSuggestionObject.push({
          interestName: prop,
          number: suggestsWithCount[prop]
        });
      }
    

      req.session.allFriends = userFriends;
      req.session.interestSuggestions = interestSuggestionObject;
      res.render('friends', {
        errorMessage: req.session.errorMessage,
        personName: req.session.personName,
        email: req.session.email,
        allFriends: req.session.allFriends,
        allSuggestions: req.session.interestSuggestions

      });


    }
  });
 });
});


module.exports = router;