const express = require('express'); 
const router = express.Router();
const userController = require('../controllers/userController');
const {check} = require('express-validator'); //Validation middleware

//Routes

router.post('/register', [
    check('username', 'Username is required').notEmpty(), //Check if the username is empty
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }), //Check if the password is at least 6 characters
  ], userController.register); //Register a new user

router.post('/login', [
    check('username', 'Please include a valid username').exists(), //Check if the username is valid
    check('password', 'Password is required').exists(),
  ], userController.login); //Login a user

module.exports = router; //Export the router