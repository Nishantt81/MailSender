require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.post('/send', async (req, res) => {
    const { name, email, message, phonenumber } = req.body;

    // --- ✅ Use Brevo SMTP instead of Gmail ---
    let transporter = nodemailer.createTransport({
        host: 'smtp-relay.brevo.com',
        port: 587,
        secure: false, // use true only for port 465
        auth: {
            user: process.env.BREVO_USER, // your verified sender email
            pass: process.env.BREVO_PASS, // your Brevo SMTP key
        },
    });

    let mailOptions = {
        from: `"IT Services" <itservices922@gmail.com>`, // Always use your verified Brevo sender
        to: 'nishantmahadik81@gmail.com', // or any email where you want to receive enquiries
        subject: 'New Enquiry from Website',
        text: `Name: ${name}\nPhone Number: ${phonenumber}\nEmail: ${email}\nMessage: ${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: '✅ Email sent successfully via Brevo' });
    } catch (error) {
        console.error('❌ Error sending email:', error);
        res.status(500).json({ message: 'Email failed to send' });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});
