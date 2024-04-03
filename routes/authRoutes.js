// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Маршрут для регистрации нового пользователя
router.post('/register', authController.register);

// Маршрут для аутентификации пользователя
router.post('/login', authController.login);

module.exports = router;
