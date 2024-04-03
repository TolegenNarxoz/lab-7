// controllers/authController.js

const bcrypt = require('bcrypt');
const User = require('../models/User');
const emailController = require('./emailController');
const { checkForDangerousChars } = require('../middleware/validationMiddleware');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (checkForDangerousChars(username) || checkForDangerousChars(email) || checkForDangerousChars(password)) {
            return res.status(400).json({ message: 'Input contains potentially dangerous characters' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            email,
            password: hashedPassword
        });
        await user.save();

        await emailController.sendEmail(req.body.email, 'Registration Successful', 'You have successfully registered.');
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (checkForDangerousChars(email) || checkForDangerousChars(password)) {
            return res.status(400).json({ message: 'Input contains potentially dangerous characters' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        res.status(200).json({ message: 'Authentication successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
