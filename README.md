# To-Do List Backend Application

## Description
This is a robust backend application for a To-Do List management system, built using Node.js, Express.js, and MongoDB. The application provides secure user authentication and comprehensive task management capabilities with JWT-based authentication.

## Key Features
- User Registration and Authentication
- Secure password hashing
- JWT-based token authentication
- CRUD operations for tasks
- Hosted on Vercel for easy access and testing

## Technologies Used
- **Backend**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Token (JWT)
- **Password Security**: bcrypt
- **Hosting**: Vercel

## Requirements
- Node.js (v14 or later)
- MongoDB database
- Postman or any API testing tool

## Installation and Local Setup

### Prerequisites
1. Ensure Node.js is installed on your system
2. Have a MongoDB database (local or cloud-based)
3. Clone the repository

### Steps to Set Up Locally
1. Clone the repository
```bash
git clone https://github.com/sobhik-sawdagar/to-do-backend.git
cd to-do-backend
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=3000
```

4. Run the application
```bash
npm start
```

## Hosted Backend URL
Base URL: `https://to-do-backend-lemon.vercel.app/`

## Endpoint Documentation

### Authentication Endpoints

#### 1. User Registration
- **URL**: `/user/register`
- **Method**: POST
- **Request Body**:
```json
{
  "username": "your_username",
  "password": "your_password"
}
```
- **Success Response**: 
  - Status Code: 201
  - Returns created user details (excluding password)

#### 2. User Login
- **URL**: `/user/login`
- **Method**: POST
- **Request Body**:
```json
{
  "username": "your_username",
  "password": "your_password"
}
```
- **Success Response**:
  - Status Code: 200
  - Returns JWT Bearer Token

### Task Endpoints (Authenticated)
*Note: All task endpoints require JWT Bearer Token in Authorization header*

#### 1. Create Task
- **URL**: `/task/tasks`
- **Method**: POST
- **Request Body**:
```json
{
  "title": "Task Title",
  "description": "Task Description",
  "status": "In-Progress",
  "duedate": "2024-12-31"
}

//In this case "status" will be "Pending" by default
{
  "title": "Task Title",
  "description": "Task Description",
  "duedate": "2024-12-31"
}

```
- **Success Response**: 
  - Status Code: 201
  - Returns created task details

#### 2. Get All Tasks
- **URL**: `/task/tasks`
- **Method**: GET
- **Success Response**:
  - Status Code: 200
  - Returns array of tasks

#### 3. Get Specific Task
- **URL**: `/task/tasks/:id`
- **Method**: GET
- **Success Response**:
  - Status Code: 200
  - Returns specific task details

#### 4. Update Task Status
- **URL**: `/task/tasks/:id`
- **Method**: PUT
- **Request Body**:
```json
{
  "status": "In-Progress"
}
```
- **Success Response**:
  - Status Code: 200
  - Returns updated task details

#### 5. Delete Task
- **URL**: `/task/tasks/:id`
- **Method**: DELETE
- **Success Response**:
  - Status Code: 200
  - Returns deletion confirmation
 
## Screenshots of Testing using Postman
1. Registration:
   ![Register](https://github.com/user-attachments/assets/48c2fd43-b329-4e02-b5b0-353342ace9fa)


2. Login and Receiving Auth Token:
   ![Login](https://github.com/user-attachments/assets/cae916a3-bf61-42fb-9a01-7bf2b237200c)


3. Create a task:
   - Setting up the Auth Token:
     ![Authorization_Token](https://github.com/user-attachments/assets/52e5dc7c-5789-4bbe-aca2-d39f09b1d272)

   ![Create](https://github.com/user-attachments/assets/0c252439-7471-4fd1-b1b0-f2d2920b13f3)


4. Fetch all tasks:
   ![FetchAll](https://github.com/user-attachments/assets/bbe822e8-c2c5-4088-ad13-41fb2e32f1d3)


5. Fetch a task by ID:
   ![FetchTaskByID](https://github.com/user-attachments/assets/8989b83d-af10-4f2a-bbc5-2a528c873cc7)


6. Update a task's status:
   ![UpdateTaskStatus](https://github.com/user-attachments/assets/64324608-ebde-455e-a537-2aa72adfb306)


7. Delete a task
   ![Delete a task](https://github.com/user-attachments/assets/0a524ff6-4bd7-4768-b8f9-fd4e8cce5886)



## Testing
You can test the API using:
- Postman
- cURL
- Any API testing tool that supports JWT authentication

### Testing Steps
1. Register a new user
2. Login to receive JWT token
3. Use the token in the Authorization header for task endpoints
4. Perform CRUD operations on tasks

## Error Handling
- 400: Bad Request
- 401: Unauthorized (Invalid/Expired Token)
- 404: Resource Not Found
- 500: Server Error

## Security Notes
- Passwords are hashed before storage
- JWT tokens expire after 1 day
- All task endpoints are protected and require authentication
