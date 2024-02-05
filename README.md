# post-comment-service

```
This is a simple web application built using Node.js, Express.js, and MongoDB. The application allows users to create posts and add comments to those posts.
```
## Architecture

```
The application follows a standard architecture:

Backend: The backend is built using Node.js and Express.js. It handles HTTP requests, communicates with the MongoDB database, and provides the necessary endpoints for creating posts and comments.

Database: MongoDB is used as the database to store posts and comments. Mongoose is utilized as an ODM (Object Data Modeling) library to interact with MongoDB.
```

### Setup and Run

1. **Clone the Repository:**

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Install Dependencies:**

    ```bash
    npm install
    ```

3. **Run the Application:**

    - **Development (with nodemon):**
        ```bash
        npm run dev
        ```
        Nodemon will watch for file changes and automatically restart the server. The server will start on `http://localhost:6001`.




### API ROUTES

### Register user
```
POST http://localhost:6001/auth/register
```
```
Content-Type: application/json

{
    "firstName" : "Sarah",
    "lastName" : "Cavill",
    "email" : "Sarah@gmail.com",
    "password" : "789456"
}
```

### Login user
```
POST http://localhost:6001/auth/login
```
```
Content-Type: application/json

{
    "email" : "JohnDoe@gmail.com",
    "password" : "123456"
}
```

### Create a post
```
POST http://localhost:6001/posts/:userId/create
Authorization: Bearer <token>
```
```
Content-Type: application/json

{
    "description" : "This is some random description"
}
```

### Add comments to a post
```
POST http://localhost:6001/posts/:postId/comment
Authorization: Bearer <token>
```
```
Content-Type: application/json

{
    "userId": "<userID>"
    "text": "Hey, congratulations on your first post!"
}
```


### Get user
```
GET http://localhost:6001/users/:id
Authorization: Bearer <token>
```

### add friend
```
PATCH http://localhost:6001/users/:id/:friendId
Authorization: Bearer <token>
```

### get user's friends
```
GET http://localhost:6001/users/:id/friends
Authorization: Bearer <token>
```


### Get all posts
```
GET  http://localhost:6001/posts/
```

### Get all posts of a user
```
GET http://localhost:6001/posts/:userId/posts
Authorization: Bearer <token>
```

### Update like of a post
```
PATCH http://localhost:6001/posts/:id/like
Authorization: Bearer <token>
```