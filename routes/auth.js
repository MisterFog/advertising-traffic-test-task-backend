const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();
const upload = require('../middlewares/upload');

// Маршрут для регистрации
router.post('/register', upload.single('profilePicture'), registerUser);

// Маршрут для авторизации
router.post('/login', loginUser);

module.exports = router;