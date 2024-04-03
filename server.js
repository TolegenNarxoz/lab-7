// server.js
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs-extra');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

// Парсер JSON
app.use(express.json());

// Парсер URL-кодированных данных
app.use(express.urlencoded({ extended: true }));

// Статические файлы (например, CSS, изображения)
app.use(express.static(path.join(__dirname, 'public')));

// Подключение к базе данных MongoDB
mongoose.connect('mongodb://localhost:27017/auth', {
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Connection to MongoDB failed:", err);
});

// Маршрут для страницы регистрации
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'register.html'));
});

// Маршрут для страницы входа
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});


// Маршруты аутентификации
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Определение порта для запуска сервера
const PORT = process.env.PORT || 3000;

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
