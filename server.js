const dotenv = require("dotenv");
require("./database/db");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { handleError } = require("./utilities/errorHandler");
const authorize = require('./authentication/auth');

//Load the environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    const content = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>To-Do List Backend System</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f9;
                    color: #333;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 800px;
                    margin: 50px auto;
                    background: #ffffff;
                    border-radius: 10px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    padding: 20px;
                }
                h1 {
                    text-align: center;
                    color: #007BFF;
                }
                p {
                    font-size: 16px;
                    line-height: 1.6;
                    margin-bottom: 20px;
                    text-align: center;
                }
                h2 {
                    color: #333;
                    margin-top: 30px;
                    border-bottom: 2px solid #007BFF;
                    padding-bottom: 5px;
                }
                h3 {
                    color: #555;
                    margin-top: 20px;
                }
                ul {
                    list-style: none;
                    padding: 0;
                }
                li {
                    background: #f9f9f9;
                    margin: 10px 0;
                    padding: 10px;
                    border-radius: 5px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                li:hover {
                    background: #e9ecef;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Welcome to To-Do List Backend System</h1>
                <p>Please test all the endpoints/routes in any API Testing service like Postman</p>
                <h2>Available Endpoints/Routes are:</h2>
                
                <h3>To Register a new user and Login (For Authentication Token)</h3>
                <ul>
                    <li>POST /user/register</li>
                    <li>POST /user/login</li>
                </ul>

                <h3>Authenticated Endpoints/Routes for the tasks</h3>
                <ul>
                    <li>POST /task/tasks - Create a new task with title (string), description (string), status (default: "Pending") and duedate (Date).</li>
                    <li>GET /task/tasks - Fetch all tasks</li>
                    <li>GET /task/tasks/:id - Fetch a task by its ID</li>
                    <li>PUT /task/tasks/:id - Update the task status (Pending, In-Progress, Completed).</li>
                    <li>DELETE /task/tasks/:id - Delete a task by its ID</li>
                </ul>
            </div>
        </body>
        </html>
    `;

    res.send(content);
});


//Middleware to parse the request body as JSON
app.use(bodyParser.json());

//Middleware to parse the request body as URL encoded data
app.use(bodyParser.urlencoded({ extended: true }));

//Error handling middleware
app.use((err, req, res, next) => {
  handleError(err, res);
});

//Import the routes from the routes folder
const userRoutes = require("./routes/userRoutes");
const tasksRoutes = require("./routes/tasksRoutes");

//Use the routes
app.use("/user", userRoutes);
app.use("/task", authorize, tasksRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
