const User = require('../Models/user_model');
const jwt = require('jsonwebtoken');

// Helper to generate JWT
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    //temp
    let user;
  try {
    const { userId, firstName, lastName, userEmail, password, role, providerId } = req.body;

    if (!userId || !firstName || !userEmail || !password || !role || !providerId) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    // const userExists = await User.findOne({ email });    //mongo
    const userExists = user?.email && user.email == email  //temp
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // const user = await User.create({ name, email, password, role }); //mongo
    user = {
        userId: userId,
        firstName: firstName,
        lastName:lastName,
        userEmail:userEmail,
        password:password,
        role: role,
        providerId:providerId
    }
    // const token = generateToken(user._id, user.role);    //mongo
    const token = generateToken(user.userId, user.role);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { registerUser };