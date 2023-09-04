const router = require("express").Router();
var nodemailer = require('nodemailer');

const User = require('../models/userSchema')

router.post('/signup', async (req, res) => {
    const name = req.body.name;
    const email = req.body.email
    const password = req.body.password

    const formData = new User({
        name: name,
        email: email,
        password: password
    })
    await formData.save();
    res.send("Inserted data..")
});

router.post('/signin', async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    User.find({ email: email, password: password }).then(function (data, docs) {
        const resp = JSON.stringify(data);
        if (resp.length > 2) {
            res.send("User exist")
        } else {
            res.send("User not exist")
        }
    });
});

router.post('/verify', async (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;

    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.PASSCODE
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    var mailOptions = {
        from: 'noreply.hungerfood@gmail.com',
        to: email,
        subject: 'Verify email-OTP',
        text: 'Thank you for choosing us. Use the ' + otp + ' as OTP to complete your Sign up procedures.'
    };
    User.find({ email: email }).then(function (data, docs) {
        const resp = JSON.stringify(data);
        if (resp.length > 2) {
            res.send("User exist")
        } else {
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    res.send("Error!")
                } else {
                    res.send("Success");
                }
            });
        }
    });
});
module.exports = router;