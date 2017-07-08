# Social Network: Fakebook 

Web application that uses Mongoose, MongoDb, and EJS in Node.js and Express.js to make a pseudo social network. 

## Features

1. Create an account with an email and password

2. Log in to an existing account with the appropriate email and password

3. Add and delete friends

4. Add posts 
- Can add post on home feed or add post when on user's own profile

5. Add and delete interests

6. View user's own profile
- Shows user's friends, list of user's posts, and list of user's interests
- Ability to add post

7. View a custom home feed based on friends
- Has user's own posts and friends' posts
- Ability to add post

8. Only view the profiles of friends 
- Can view friends, posts, and interests of a friend's profile
- When accessing a profile of someone a user is not friends with, the user may only view a list of friends

9. Friend suggestions
- Shows number of mutual friends and/or number of interests in common
- Based on number of mutual friends and/or number of interests in common

10. Interests suggestions
- Shows number of friends that like each interest suggestion
- Based on friends' interests


## To execute the program
1. Have MongoDB installed. If you do not, navigate [here](https://docs.mongodb.com/master/administration/install-community/) and follow the instructions.
2. Make sure to have `$ mongod` running in another terminal.
3. In another window of the terminal, execute the following command-line bash `$ npm install` in the root directory of the project.
4. Next, execute `$ npm start`
5. Navigate to `http://localhost:3000` on your browser. 

## User Manual

1. Main page that appears when you first navigate to http://localhost:3000
![picture1](https://user-images.githubusercontent.com/22601709/27988832-7d096fa4-63fa-11e7-8e76-8be7a5420451.png)
