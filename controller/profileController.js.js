// controllers/profileController.js
const User = require('../Models/user_model');

// @desc    Get logged-in user profile
// @route   GET /api/profile/me
// @access  Private (Patient or Provider)
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('Profile Fetch Error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Update logged-in user profile
// @route   PUT /api/profile/update
// @access  Private (Patient or Provider)
const updateProfile = async (req, res) => {
  try {
    const { userEmail, firstName, lastName } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (userEmail) user.userEmail = userEmail;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    // if (healthInfo) {
    //   user.healthInfo = {
    //     ...user.healthInfo,
    //     ...healthInfo
    //   };
    // }

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.userEmail,
        role: updatedUser.role,
        // healthInfo: updatedUser.healthInfo
      }
    });
  } catch (error) {
    console.error('Profile Update Error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = { getProfile, updateProfile };
