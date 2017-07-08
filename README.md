# Social Network: Fakebook 

Web application that uses Mongoose, MongoDb, and EJS in Node.js and Express.js to make a pseudo social network. 


Users can create accounts with an email and password and can login to their respective accounts. They can add and delete friends. They also have the ability to add posts and add interests. Users can view their own profiles, view custom home feeds based on their friends, and only view other profiles (posts and interests) of users that they are friends with. Users can view friend suggestions and interest suggestions. 

## New Features

1. Ability to add/delete/store interests
- db/mongo.js : updated user schema
- db/users.js: added methods to update, delete, and get interests of users
- routes/settings.js: created router for settings; created get and post requests
- settings.html: html and ejs for page

2. Show friends on own profile and other profiles
- routes/profile.js: updated router; updated get and posts requests
- profile.html: updated html and ejs for page to show friends

3. Show interests on own profile and other profiles (can only see interests of other users if friends)
- routes/profile.js: updated router; updated get and posts requests
- profile.html: updated html and ejs for page to show interests (only if friends or own profile)

4. Suggest people to add with at least 1 mutual friends 
- routes/suggestions.js: added new router; implemented get request to show people (that user is not friends with) to add based off of mutual friends
- views/suggestions.html: html and ejs for page

5. Suggest people to add with at least 1 similar interests
- routes/similar.js: added new router; implemented get request to show people (that user is not friends with) to add based off interests
- views/similar.html: html and ejs for page

6. Suggest interests to add based off of friends' interests
- routes/friends.js: updated router; updated get request to show suggested interests (interests that user has not added) based off friends
- views/friends.html: updated html and ejs for page

7. Added error checking to send appropriate error messages

8. Updated app.js to accommodate all the above changes

All commits, except the first commit, work on the additional features and are additional code.  


## To execute the program:
1. Have MongoDB installed. If you do not, navigate [here](https://docs.mongodb.com/master/administration/install-community/) and follow the instructions.
2. Make sure to have `$ mongod` running in another terminal.
3. In another window of the terminal, execute the following command-line bash `$ npm install` in the root directory of the project.
4. Next, execute `$ npm start`
5. Navigate to `http://localhost:3000` on your browser. 
