const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Регистрация пользователя
exports.registerUser = async (req, res) => {
  const { name, email, password, birthDate, gender } = req.body;
  const profilePicture = req.file ? req.file.path : null;

  try {
    // Проверка на существование пользователя
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Создание нового пользователя
    user = new User({
      name,
      email,
      password,
      birthDate,
      gender,
      profilePicture
    });

    await user.save();

    // Создание JWT токена
    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Авторизация пользователя
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Проверка существования пользователя
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Проверка пароля
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Создание JWT токена
    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};