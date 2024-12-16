const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const dotenv = require('dotenv');

dotenv.config();

const jwtUserAuth = async (req, res, next) => {

    //check if the token is present in the request header
    const authHeader = req.headers.authorization; 
    
    if(!authHeader) return res.status(401).json({error : 'Access Denied'}); //Response that the server sends back to the client if there is an error.

    //Extract the jwt token from the header
    const jwtToken = authHeader.split(' ')[1];

    //Verify the token
    try{
        const verified = jwt.verify(jwtToken, process.env.JWT_SECRET); //Token is verified using the jwt library.
        const user = await User.findOne({_id : verified.id}); //This is the data that is fetched from the database.

        if(!user) return res.status(404).json({error : 'User not found'}); //Response that the server sends back to the client if there is an error.

        //Attach the user data to the request object
        req.user = user;
        
        next();

    }catch(err){
        console.log(err);

        //Response that the server sends back to the client if there is an error.
        return res.status(401).json({error : 'Invalid Token'});
    }

};

module.exports = jwtUserAuth;