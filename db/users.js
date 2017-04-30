var mongo = require('./mongo');
var bcrypt = require('bcrypt');

module.exports = {
  getAllUsers: function (callback) {
    mongo.Users.find().sort({
      $natural: -1
    }).exec(function (error, users) {
      callback(error, users);
    });
  },

  addUser: function (personName, email, password, callback) {
    var newUser = new mongo.Users({
      personName: personName,
      email: email,
      password: password,
      friends: [],
      homePosts: [],
      interests: []
    });
    newUser.save(function (error) {
      callback(error);
    });
  },

  findUser: function (email, cb) {
    mongo.Users.findOne({
      email: email
    }, function (err, user) {
      if (!user) cb('no user');
      else {
        cb(null, user);
      };
    });
  },

  checkIfLegit: function (email, password, cb) {
    mongo.Users.findOne({
      email: email
    }, function (err, user) {
      if (!user) cb('no user');
      else {
        bcrypt.compare(password, user.password, function (err, isRight) {
          if (err) return cb(err);
          cb(null, isRight);
        });
      };
    });
  },

  getFriendsOfUser: function (email, cb) {
    mongo.Users.findOne({
      email: email
    }, function (err, user) {
      if (!user) cb('no user');
      else {
        cb(null, user.friends);
      }
    });
  },


  addFriendToUser: function (userEmail, friendEmail, friendName, cb) {
    mongo.Users.update({
      email: userEmail
    }, {
      $push: {
        friends: {
          personName: friendName,
          email: friendEmail
        }
      }
    }, function (err, result) {
      if (err) throw err;
      else {
        cb(null, result);
      }
    });
  },

  deleteFriendToUser: function (userEmail, friendEmail, friendName, cb) {
    mongo.Users.update({
      email: userEmail
    }, {
      $pull: {
        friends: {
          personName: friendName,
          email: friendEmail
        }
      }
    }, function (err, result) {
      if (err) throw err;
      else {
        cb(null, result);
      }
    });
  },

  addOnePostToHomePostForUser: function (userEmail, posterEmail, posterName, posterText, cb) {
    mongo.Users.update({
      email: userEmail
    }, {
      $push: {
        homePosts: {
          email: posterEmail,
          personName: posterName,
          text: posterText
        }
      }
    }, function (err, result) {
      if (err) throw err;
      else {
        cb(null, result);
      }
    });
  },

  addPostToHomePostForUser: function (userEmail, posterInformation, cb) {
    mongo.Users.update({
      email: userEmail
    }, {
      $pushAll: {
        homePosts: posterInformation
      }
    }, function (err, result) {
      if (err) throw err;
      else {
        cb(null, result);
      }
    });
  },

  deletePostToHomePostForUser: function (userEmail, posterEmail, cb) {
    mongo.Users.update({
      email: userEmail
    }, {
      $pullAll: {
        homePosts: {
          email: posterEmail
        }
      }
    }, function (err, result) {
      if (err) throw err;
      else {
        cb(null, result);
      }
    });
  },

   getInterestsOfUser: function (email, cb) {
    mongo.Users.findOne({
      email: email
    }, function (err, user) {
      if (!user) cb('no user');
      else {
        cb(null, user.interests);
      }
    });
  },

  addInterestToUser: function (userEmail, interest, cb) {
    mongo.Users.update({email: userEmail}, {$addToSet: {interests: interest}}, function (err, result) {
      if (err) throw err;
      else {
        cb(null, result);
      }
    });
  },

  deleteInterestFromUser: function (userEmail, interest, cb) {
    mongo.Users.update({email: userEmail}, {$pull: {interests: interest}}, function (err, result) {
      if (err) throw err;
      else {
        cb(null, result);
      }
    });
  }

};