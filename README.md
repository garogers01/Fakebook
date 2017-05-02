# Social Network: Fakebook 

View my original code that I used a foundation : [CIS 197 final project](https://github.com/amandaklim/cis197_final_project)

Web application that uses Mongoose, MongoDb, and EJS in Node to make a pseudo social network. 


Users can create accounts with an email and password. Users can login to their respective accounts. They can add and delete friends. Users can view their profiles, view custom home feeds based on their friends, and only view other profiles (posts and interests) of users that they are friends with. 


## New Features

Specific additional features implemented for NETS 150 that I did not include in my CIS 197 project:


1. Ability to add/delete/store interests
- db/mongo.js : updated user schema
- db/users.js: added methods to update and delete interests
- routes/settings.js: router for settings
- settings.html: html and ejs for page

2. Show friends on own profile and other’s profiles
- routes/profile.js
- profile.html

3. Show interests on profile and other’s profiles (can only see interests of other users if friends)
- routes/profile.js
- profile.html

4. Suggest people to add with at least 1 mutual friends (triadic closure)
- routes/suggestions.js
- views/suggestions.html

5. Suggest people to add with at least 1 similar interests (triadic closure)
- routes/similar.js
- views/similar.html

6.Suggest interests to add based off of friends' interests (triadic closure)
- routes/friends.js
- views/friends.html

7. Added error checking to send appropriate error messages

8. Updated app.js to accommodate all the above changes

All commits besides the first commit work on the additional features and are additional code.  

## To execute the program:
1. Have MongoDB installed. If you do not, navigate to https://docs.mongodb.com/master/tutorial/install-mongodb-on-os-x/?_ga=1.250858244.360716299.1493541668 and follow the instructions.
2. Make sure to have `$ mongod` running in another terminal.
3. In the terminal, execute the following command-line bash `$ npm install`
4. Next, execute `$ npm start`
5. Navigate to `http://localhost:3000` on your browser. 