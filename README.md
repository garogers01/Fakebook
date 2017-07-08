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

2. When you click "Login" you get taken to the following:

![picture2](https://user-images.githubusercontent.com/22601709/27988833-7d0c2bea-63fa-11e7-9d34-5892774abd4e.png)

3. When you click "Create Account" you get taken to the following:

![picture3](https://user-images.githubusercontent.com/22601709/27988834-7d11276c-63fa-11e7-8283-df51272fcd47.png)

4. When you log in to your account: You see a home page with your name, with a custom home feed that shows only your posts and your friend posts. You can add posts from your home page. You can get back to this page anytime by clicking “Home”. Registering for an account takes you to the same page but you will have no posts as you are a new user.

![picture4](https://user-images.githubusercontent.com/22601709/27988835-7d13df2a-63fa-11e7-8012-a5ef3e486f11.png)

5. When you click on “My Profile” you can view your profile, add posts, see your interests, and see your friends

![picture5](https://user-images.githubusercontent.com/22601709/27988837-7d163978-63fa-11e7-81b2-5fc9de7033d2.png)

6. Scrolling down on my profile: you can see your interests and your friends

![picture6](https://user-images.githubusercontent.com/22601709/27988836-7d14f07c-63fa-11e7-8815-31cb08a42a14.png)

7. When you click on “My Friends” you see a list of your friends, and some interest suggestions (that are not part of your interests) that you may like based off of your friends’ interests

![picture7](https://user-images.githubusercontent.com/22601709/27988838-7d1a936a-63fa-11e7-9d64-98cb94809f3b.png)

8. When you click on a friend’s profile, you have the option to delete the friend. You can see the friends’ posts, their interests, and their friends. 

![picture8](https://user-images.githubusercontent.com/22601709/27988839-7d1e19b8-63fa-11e7-8cbc-f2d3e48cfdee.png)

9. Scrolling down on a friends’ page: you can see the rest of their interests and their friends

![picture9](https://user-images.githubusercontent.com/22601709/27988840-7d204a9e-63fa-11e7-9a40-bbddae784fe6.png)

10. On the suggested friends page you can view friend suggestions (people you are not friends with) based on how many mutual friends you have with another person:

![picture10](https://user-images.githubusercontent.com/22601709/27988841-7d247fba-63fa-11e7-8293-d6c15d6c297b.png)

11. On the view people with similar interests you can view people (who you are not friends with) with similar interests to you based on how many interests you have in common:

![picture11](https://user-images.githubusercontent.com/22601709/27988842-7d25c794-63fa-11e7-827c-096414719711.png)

12. When you click on someone’s profile that you are not friends with, you can only see an add friend button and their friends. 

![picture12](https://user-images.githubusercontent.com/22601709/27988843-7d292d26-63fa-11e7-9782-55dcfc6b39e3.png)

13. When you add someone you aren’t friends with, the button changes to “Delete friend” and their posts and interests appear (their full profile). Their friends will still be available if you scroll down. You are now friends.

![picture13](https://user-images.githubusercontent.com/22601709/27988844-7d29b548-63fa-11e7-81b1-c10deb76ad12.png)

14. Scrolling down on your new friend’s profile, you will see that now you are part of their friends!

![picture14](https://user-images.githubusercontent.com/22601709/27988845-7d2dfd10-63fa-11e7-8e41-1994caf22672.png)

15. When you click on settings, you can add and delete your interests here.

![picture15](https://user-images.githubusercontent.com/22601709/27988846-7d301bc2-63fa-11e7-880e-a7d2873de17a.png)

16. When you click “Logout” you are taken to the following page where you can login or create account.

![picture16](https://user-images.githubusercontent.com/22601709/27988847-7d3547be-63fa-11e7-905f-7377eca1ecf9.png)
