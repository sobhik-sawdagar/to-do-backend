const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
});

//`pre` middleware function to hash the password before saving the data to the database.
userSchema.pre('save', async function(next){
    const user = this;// This is the object that is created from the data that is sent in the request body.

    if(!user.isModified('password')) return next(); //This is the response that the server sends back to the client if the data is saved successfully.

    try{
        //Hash password generation
        const salt = await bcrypt.genSalt(10); //This is the data that is generated using the bcrypt library.   
        
        //Hashed Password
        const hashedPassword = await bcrypt.hash(user.password, salt); // This is the data that is generated using the bcrypt library.

        //Overwrite the password with the hashed password
        user.password = hashedPassword; //This is the data that is generated using the bcrypt library.    

        next(); //This is the response that the server sends back to the client if the data is saved successfully.
   
    }catch(err){
        return next(err); //This is the response that the server sends back to the client if there is an error.
    }
});

//`methods` function to compare the password with the hashed password.
userSchema.methods.comparePassword = async function(enteredPassword){
    try{
        //Compare the password with the hashed password
        return await bcrypt.compare(enteredPassword, this.password); //This is the data that is compared with the hashed password.
    }catch(err){
        return false; //This is the response that the server sends back to the client if there is an error.
    }
};

const User = mongoose.model('User', userSchema);

module.exports = User; 