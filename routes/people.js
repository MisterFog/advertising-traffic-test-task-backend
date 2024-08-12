const express = require('express');
const { getAllUsersExceptCurrent } = require('../controllers/peopleController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Получение всех пользователей, кроме текущего
router.get('/', authMiddleware, getAllUsersExceptCurrent);

module.exports = router;