const jwt = require('jsonwebtoken');
const dotenv = require('dotenv'); //import the dotenv module
dotenv.config(); //configure the dotenv module

const generateToken = (payload) => { //function to generate a jwt token
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1d'}); //sign the payload with the secret key and set the expiry time to 1 day
};

module.exports = generateToken;