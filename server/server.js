const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const User = require('./models/userSchema')
const Item = require('./models/itemSchema')
const Order = require('./models/orderSchema')
var nodemailer = require('nodemailer');

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://princepatel30082003:Prince@cluster0.mnuw43k.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });

app.get("/", (req, res) => {
    res.json("Hello")
})
app.get("/p", (req, res) => {
    res.json("Helo")
})
app.post('/signup', async (req, res) => {
    const name = req.body.name;
    const email = req.body.email
    const password = req.body.password

    const formData = new User({
        name: name,
        email: email,
        password: password
    })


    await formData.save();
    res.send("inserted data..")
});
app.post('/signin', async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    User.find({ email: email, password: password }).then(function (err, docs) {
        const resp = JSON.stringify(err);
        if (resp.length > 2) {
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
    User.find({ email: email }).then(function (err, docs) {
        const resp = JSON.stringify(err);
        if (resp.length > 2) {
            res.send("User exist")
        } else {
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                } else {
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
    const count = req.body.count
    const name = req.body.name
    const price = req.body.price
    const category = req.body.category
    const src = req.body.src
    const orderData = new Order({
        id: id,
        email: email,
        payment: payment,
        count: count,
        timestamp: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' }),
        name: name,
        price: price,
        category: category,
        src: src
    })
    await orderData.save();
    res.send("insert item..")
});

app.get('/getItems', async (req, res) => {
    Order.find({ email: req.query.email }).then(function (err, docs) {
        res.send(err);
    });
});

app.get('/getCartItems', async (req, res) => {
    Order.find({ email: req.query.email }).then(function (data, docs) {
        res.send(data);

    });
});

app.post('/removeItem', async (req, res) => {
    const id = req.body.id;
    const email = req.body.email
    Order.deleteMany({ id: id, email: email }).then(function (err, docs) {
        res.send("Delete Successfully");
    });
});

app.post('/updateItem', async (req, res) => {
    const id = req.body.params.id;
    const email = req.body.params.email
    const type = req.body.params.type;
    let curr = await Order.findOne({ email: email, id: id });
    curr.count += type;
    if (curr.count > 0) {
        await curr.save();
        let cnt = curr.count
        res.send({ count: cnt });
    } else {
        res.send({ count: 1 });
    }
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});