var express = require('express');
var router = express.Router();
var userPostsDb = require('../db/userPosts');
var usersDb = require('../db/users');
var checkValidUser = require('../middlewares/checkValidUser');

router.get('/settings/:email/:personName', function (req, res, next) {
 
usersDb.getInterestsOfUser(req.params.email, function (err, interests) {

});

});

router.post('/settings/:email/:personName', function (req, res, next) {


});

module.exports = router;