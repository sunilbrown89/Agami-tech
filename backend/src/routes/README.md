API

1. For Signup: --------------------->
Method:POST
URL:http://localhost:5000/api/auth/signup
body: JSON format : {"name":"Sunil", email:"sunil@gmail.com",password:"sunil@gmail.com"}
Message/Response: User created Sucessfully

2. For Login:------------------------->
Authorization:Bearer <Enter JWT_TOKEN>
method: POST
URL: http://localhost:5000/api/auth/login
body : JSON format : 
{
    "email": "sunil@gmail.com",
    "password": "sunil@gmail.com"
}
Message/Response: Give a JWT Token // by the help of JWT token we can make update and delete


3. For getting self user details:------------------------->
Authorization:Bearer <Enter JWT_TOKEN>
method: GET
URL: http://localhost:5000/api/auth/me
Message/Response: 
{
  "_id": "66ffafc5e7ae98e26db401a5",
  "name": "user7",
  "email": "user7@gmail.com",
  "__v": 0
}





4. For creating a Blog:------------------------------>
Method: POST
URL: http://localhost:5000/api/blogs/create-blog
Authorization:Bearer <Enter JWT_TOKEN>
body: JSON format : 
{
    "title": "My S Blog app",
    "description": "This is the content of my S blog.",
    "image": "https://example.com/my-second-blog-image.jpg"
}
Message/Response:  'Blog created successfully' with response blog


For getting all Blogs:--------------------------->
Method: GET
URL: http://localhost:5000/api/blogs
Message/Response:  Fetch all the data


For getting specific users all Blogs:--------------------------->
Method: GET
URL: http://localhost:5000/api/blogs/my-blogs
Message/Response:  Fetch all the data



For updating a Blog:----------------------------->
Method: PUT
URL: http://localhost:5000/api/blogs/<enter the blogId>
Authorization:Bearer <Enter JWT_TOKEN>
body: JSON format : what you want to update
{
    "title": "My S Blog app",
    "description": "This is the content of my S blog.",
    "image": "https://example.com/my-second-blog-image.jpg"
}
Message/Response:  'Blog updated successfully' with response blog




For deleting a Blog:------------------>
Method: DELETE
URL: http://localhost:5000/api/blogs/66fe69798c4af718b763e61b
Authorization:Bearer <Enter JWT_TOKEN>
Message/Response:  'Blog deleted successfully' with response blog


For like dislike to a particular blog:--------------->
Method: POST
URL:http://localhost:5000/api/blogs/<blogId>/reaction
Authorization:Bearer <Enter JWT_TOKEN>
body: JSON format : 
{
  "reaction": "dislike"   //like-dislike vice-vers
}
Message/Response:  'Blog updated successfully' with response blog


For comment to a particular blog:------------------->
Method: POST
URL:For like dislike to a particular blog:
Method: POST
URL:http://localhost:5000/api/blogs/<blogId>/comments
Authorization:Bearer <Enter JWT_TOKEN>
body: JSON format : 
{
  "content": "I am user2 and its my 1st comment and commenting of user1 3rd-blog This is a comment on the blog!"
}
Message/Response:  'comment added  successfully' with response blog comment




For like-dislike a particular comment of blog:------------------->
Method: POST
URL:




For like dislike to a particular blog:
Method: PUT
URL:http://localhost:5000/api/blogs/<blogId>/comments/<commentId>/reaction
Authorization:Bearer <Enter JWT_TOKEN>
body: JSON format : 
{
  "reaction": "like" // like or dislike
}
Message/Response:  'comment added  successfully' with response blog comment
