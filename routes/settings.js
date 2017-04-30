var express = require('express');
var router = express.Router();
var userPostsDb = require('../db/userPosts');
var usersDb = require('../db/users');
var checkValidUser = require('../middlewares/checkValidUser');

router.get('/settings/:email/:personName', function (req, res, next) {

  usersDb.getInterestsOfUser(req.params.email, function (err, interests) {
    req.session.interests = interests;
      if (!interests || interests === '') {
        req.session.interests = [];
      } else {
        req.session.myPosts = interests;
      }

        res.render('settings', {
        errorMessage: req.session.errorMessage,
        personName: req.params.personName,
        userName: req.session.personName,
        personEmailName: req.params.email,
        email: req.session.email,
        myInterests: req.session.interests
      });

  });

});

router.post('/settings/:email/:personName', function (req, res, next) {
  usersDb.addInterestToUser(req.params.email, req.body.text, function (err, result) {
       if (err) {
        res.send('error' + err);
      } else {
        
        res.redirect('/settings/' + req.params.email + '/' + req.params.personName);
      }
  });  

});

module.exports = router;