# Amazing Clothes
## About the Project
Amazing Clothes is a social media and recommendation platform for parents where they can review kid's clothing, get informed recommendations and share their shopping experiences with a vast community.

## Tech
React Native | JavaScript | Firebase

## Application Features
- Fashionable parents have the phenomenon of conformity and chasing           fashion clothes for their kids. In our app, users can upload pictures (videos) of products they are interested in, and follow the trend of the fashion product based on the likes or dislikes of other users for purchase reference. 
- Amazing Clothes brings you a new way to create and discover fancy clothes from all over the world. You can watch, like, comment and share clothes in a dedicated space.

## Application Innovations
- Both manufacturers and consumers are potential users of the app. Considering the information gap between brands and fans, the APP will set up a special operation section for brand users.
- By reducing poor information, brands can produce effectively, reduce unsalable products, and reduce the cost of trial and error for fans, which is green and environmentally friendly.
- Users can easily know the trendy clothes.

## Iteration 1
### Add New(Zongyi Jiang)
- This screen allows users to share information of their favorite clothes, including title, image, and content. Utilized Firebase to store the clothes information.
- Initialize the Firebase database

### Discover(Jing Luo)
- This screen shows beautiful pictures from users, Using useEffect, Firestore storage, Icons 
- Working in process.
### Top 10(Peiyao Li)
- Top 10 provides a content-based recommendation system based on user's favorite records. Working in progress.

### My Profile(Peiyao Li)
- Working in progress.

## Iteration 2
- Please refresh the page when image not loading
### Add New(Zongyi Jiang)
<img src="https://drive.google.com/uc?export=view&id=1-UAkF4ztUqyMXTYmf8O_PBe1ueanGVvk"  style="height:30%; width:30%" >
<img src="https://drive.google.com/uc?export=view&id=1g63dmGFYloduYtKpQaIngUpKf3GrQ9El"  style="height:30%; width:30%" >
- Add new features such as tracking user's geographic location with Google Map, uploading an image from photos library and taking an image in a mobile app.
- Initialize the location service using Google Cloud

### Discover(Jing Luo)
<img src="https://drive.google.com/uc?export=view&id=1m50hsFLqLEiOVwVMijdkNRs9lKjQ9_Oz"  style="height:30%; width:30%" >
- Add new features like searching specific clothes from database, voting like or dislike for further recommendations, adding reviews to the products.

### Top 10(Peiyao Li)
<img src="![2387cb9f2454d26f62720650a13cf40](https://user-images.githubusercontent.com/78027883/205567358-12a88229-bc98-41c3-adc8-d17e5814c818.jpg)"  style="height:30%; width:30%" >
- Working in progress.

### My Profile(Peiyao Li)
<img src="https://drive.google.com/uc?export=view&id=1KEYCkhNZJKy8Uhi0rWSz1Wqch1Pxn4k1"  style="height:30%; width:30%" >
- Add new features like showing user's basical info, adding authorization to ensure that only a user who created a post is able to delete.

### Log In & Sign Up(Peiyao Li)
<img src="https://drive.google.com/uc?export=view&id=1Ue7BaRX9FkObimQ3qTu8lSlFGvIc0vkG"  style="height:30%; width:30%" >
<img src="https://drive.google.com/uc?export=view&id=1chrcKkG8ZAVzjCyp12GXUX2Dzr0uffVU"  style="height:30%; width:30%" >
- Implement user authentication using Firebase Authentication. Sign up for new users. Login and logout for existing users.

## Iteration 3
- Please refresh the page when image not loading

### My Profile(Zongyi Jiang)
- add Notification when pressing "Check Current Clothes Number" button, it will show the current number of clothes in database.

### Add New(Zongyi Jiang)
- add external api for each clothes, it allows user to upload a certain shopping website

### Top 10 (Peiyao Li)
- add top sorting, user info and like amount on top 10 clothes
