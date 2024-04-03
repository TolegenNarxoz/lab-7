// controllers/emailController.js
const nodemailer = require('nodemailer');

// Функция отправки электронного письма
exports.sendEmail = async (recipient, subject, message) => {
    try {
        // Настройки транспорта электронной почты (SMTP)
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // upgrade later with STARTTLS
            auth: {
                user: 'amangelditolegen7@gmail.com', // Замените на свой email
                pass: 'ipovzkrvhbyngxzd' // Замените на свой пароль
            }
        });

        // Настройка письма
        const mailOptions = {
            from: 'Your App <amangelditolegen7@gmail.com>', // Замените на свой email
            to: recipient,
            subject: subject,
            text: message
        };

        // Отправка письма
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
