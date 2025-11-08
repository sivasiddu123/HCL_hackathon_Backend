const User = require('../Models/user_model');
const bcrypt = require('bcryptjs');
const {generateToken} = require('../Common/common_functions')

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    //temp
    // let user;
  try {
    const { firstName, lastName, userEmail, password, role, providerId } = req.body;

    if (!firstName || !userEmail || !password || !role || !providerId) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    const userExists = await User.findOne({ userEmail });    //mongo
    // const userExists = user?.email && user.email == email  //temp
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({firstName, lastName, userEmail, password, role, providerId }); //mongo
    // user = {
    //     userId: userId,
    //     firstName: firstName,
    //     lastName:lastName,
    //     email:email,
    //     password:password,
    //     role: role,
    //     providerId:providerId
    // }
    console.log("user", user)
    const token = generateToken(user._id, user.role);    //mongo
    // const token = generateToken(user.userId, user.role);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      userEmail: user.userEmail,
      role: user.role,
      token
    });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Login user (patient/provider)
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  //temp
  // let user = {
  //   userId: '123',
  //   firstName: 'test',
  //   lastName: 'test1234',
  //   email: 'test@mail.com',
  //   password: 'test1234',
  //   role: 'patient',
  //   providerId: '12345'
  // };
  try {
    const { userEmail, password } = req.body;

    // Validate inputs
    if (!userEmail || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    // Check if user exists
    const user = await User.findOne({ userEmail });  //mongo
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken(user._id, user.role);  //mongo
    // const token = generateToken(user.userId, user.role);  //temp

    // Return success response
    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        _id: user._id,
        name: user.name,
        userEmail: user.userEmail,
        role: user.role
      },
      token
    });
  } catch (error) {
    console.error('Login Error:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { registerUser, loginUser };