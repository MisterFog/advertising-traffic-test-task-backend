const User = require('../models/User');

exports.getUserProfile = async (req, res) => {
	try {
	  const user = await User.findById(req.user._id).select('-password');

	  res.json(user);
	} catch (err) {
	  console.error(err.message);
	  res.status(500).send('Server error');
	}
  };
  
exports.updateUserProfile = async (req, res) => {
  try {
    console.log(req.user);
    const user = await User.findById(req.user._id); 

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Обновление данных пользователя
    user.name = req.body.name || user.name;
    user.password = req.body.password || user.password;

    if (req.file) {
      user.profilePicture = req.file.path; 
    }

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: {
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};