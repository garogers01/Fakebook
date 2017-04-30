var mongo = require('./mongo');
module.exports = {
  getAllUserPosts: function (callback) {
    mongo.UserPosts.find().sort({
      $natural: -1
    }).exec(function (error, userPosts) {
      callback(error, userPosts);
    });
  },

  getUserPostsByUser: function (emailUser, callback) {
    mongo.UserPosts.find({
      emailUser: emailUser
    }).sort({
      $natural: -1
    }).exec(function (error, userPosts) {
      if (!userPosts) cb(null, []);
      else {
        callback(null, userPosts);
      };
    });
  },

  getRecentPost: function (emailUser, callback) {
    mongo.UserPosts.findOne({
      emailUser: emailUser
    }).sort({
      $natural: -1
    }).exec(function (error, userPost) {
      if (!userPost) cb(null, []);
      else {
        callback(null, userPost);
      };
    });
  },

  addUserPost: function (emailUser, text, personName, callback) {
    var userPost = new mongo.UserPosts({
      emailUser: emailUser,
      text: text,
      personName: personName
    });
    userPost.save(function (error) {
      callback(error);
    });
  }

};