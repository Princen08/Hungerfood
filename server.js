const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const User = require('./userSchema')
const Item = require('./itemSchema')
const Order = require('./orderSchema')
var nodemailer = require('nodemailer');

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/Food-Coupon-System', { useNewUrlParser: true });

app.post('/signup', async (req, res) => {
    const name = req.body.name;
    const email = req.body.email
    const password = req.body.password

    const formData = new User({
        name: name,
        email: email,
        password: password
    })

    try {
        await formData.save();
        console.log("Data added");
        res.send("inserted data..")
    } catch (err) {
        console.log(err)
    }
});
app.post('/signin', async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    User.find({email: email, password: password}).then(function (err, docs) {
       const resp = JSON.stringify(err);
       if(resp.length > 2) {
        res.send("User exist")
       } else {
        res.send("User not exist")
       }
    });
});

app.post('/verify', async (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;
    
    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: 'noreply.hungerfood@gmail.com',
            pass: 'ubfgfhppoqfwkexk'
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
    User.find({email: email}).then(function (err, docs) {
        const resp = JSON.stringify(err);
        if(resp.length > 2) {
         res.send("User exist")
        } else {
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                    res.send("Success");
                }
            });
        }
    });
});


app.get('/getMenu', async (req, res) => {
    Item.find({}).then(function (err, docs) {
        res.send(err);
    });
});

app.post('/addItem', async (req, res) => {
    const id = req.body.id;
    const email = req.body.email
    const payment = req.body.payment

    const orderData = new Order({
        id: id,
        email: email,
        payment: payment,
        timestamp: new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})
    })

    try {
        await orderData.save();
        console.log("Item added");
        res.send("insert item..")
    } catch (err) {
        console.log(err)
    } 
});

app.get('/getItems', async (req, res) => {
    Order.find({email: req.query.email}).then(function (err, docs) {
        res.send(err);
    });
});

app.post('/removeItem', async (req, res) => {
    const id = req.body.id;
    const email = req.body.email
    Order.deleteMany({id: id, email: email}).then(function (err, docs) {
        res.send("Delete Successfully");
    });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});