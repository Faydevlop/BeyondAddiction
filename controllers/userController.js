const User = require('../models/userModel');
const bcrypt = require('bcrypt')


// @desc    Create a new user
const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  
  
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  try {
    const existUser = await User.findOne({email});
    if(existUser){
        return res.status(400).json({message:'User Already Exist'});
    }
    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ username, email, password:hashedPassword });
    const savedUser = await newUser.save();
    
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Login to an Exist
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log('req is here', email, password);

  // Check if both email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // Check if user exists
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(400).json({ message: 'User not found.' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, existUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Return a success message (no JWT or token)
    res.status(200).json({
      message: 'Login successful',
      user: {
        username: existUser.username,
        email: existUser.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const signupGuest = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username is already taken.' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const guestUser = new User({
      username,
      password: hashedPassword,
      email: null, // No email for guest accounts
      isGuest: true, 
    });

    const savedGuestUser = await guestUser.save();

    // Return the saved guest user (excluding password for security)
    res.status(201).json({
      message: 'Guest account created successfully',
      user: {
        id: savedGuestUser._id,
        username: savedGuestUser.username,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};



module.exports = {loginUser, createUser,signupGuest };
