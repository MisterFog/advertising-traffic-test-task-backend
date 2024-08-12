const User = require('../models/User');

const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`; // или moment(date).format('DD.MM.YYYY');
};

exports.getAllUsersExceptCurrent = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(400).json({ message: 'User ID is missing from request' });
    }

    // Найти всех пользователей, кроме текущего
    const users = await User.find({ _id: { $ne: req.user._id } }).select('name profilePicture birthDate');

    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    const userProfiles = users.map(user => {
      // Форматируем дату рождения
      const birthDate = user.birthDate ? new Date(user.birthDate) : null;
      const formattedBirthDate = birthDate ? formatDate(birthDate) : 'Unknown';

      return {
        name: user.name,
        profilePicture: user.profilePicture,
        birthDate: formattedBirthDate, 
      };
    });

    res.json(userProfiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};