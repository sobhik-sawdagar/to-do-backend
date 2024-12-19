const User = require("../models/userSchema");
const generateToken = require("../authentication/generateToken");
const {validationResult} = require('express-validator');

//Register a new user
exports.register = async (req, res) => {

  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, password } = req.body;
    const user = new User({ username, password});
    await user.save();
    console.log(user + "User registered successfully");
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Registration failed" });
  }
};

//Login a user
exports.login = async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) { 
    return res.status(400).json({ errors: errors.array() });
  } 

  try {
    const { username , password } = req.body;
    const user = await User.findOne({ username : username });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    //Generate a token
    const payload = { id: user._id };
    const token = generateToken(payload);

    res.status(200).json({ token: token });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Authentication failed" });
  }
};
