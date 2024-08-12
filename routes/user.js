const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const upload = require('../middlewares/upload');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/profile/:userId', authMiddleware, getUserProfile);

router.put('/profile', authMiddleware, upload.single('profilePicture'), updateUserProfile);

module.exports = router;