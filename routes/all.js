var express = require('express');
var router = express.Router();
var usersDb = require('../db/users');
var userPostsDb = require('../db/userPosts');
var checkValidUser = require('../middlewares/checkValidUser');


router.get('/all', function (req, res, next) {
  usersDb.getAllUsers(function (err, users) {
    if (err) {

    } else {
      req.session.allUsers = users;
      res.render('all', {
        errorMessage: req.session.errorMessage,
        personName: req.session.personName,
        email: req.session.email,
        allUsers: req.session.allUsers
      });
    }

  });


});


module.exports = router;