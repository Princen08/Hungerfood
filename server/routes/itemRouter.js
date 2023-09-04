const router = require("express").Router();

const Item = require('../models/itemSchema')
const Order = require('../models/orderSchema')

router.get('/getMenu', async (req, res) => {
    Item.find({}).then(function (data, docs) {
        res.send(data);
    });
});

router.post('/addItem', async (req, res) => {
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
    res.send("Added Successfully")
});

router.get('/getCartItems', async (req, res) => {
    Order.find({ email: req.query.email }).then(function (data, docs) {
        res.send(data);
    });
});

router.post('/removeItem', async (req, res) => {
    const id = req.body.id;
    const email = req.body.email
    Order.deleteMany({ id: id, email: email }).then(function (data, docs) {
        res.send("Delete Successfully");
    });
});

router.post('/updateItem', async (req, res) => {
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

module.exports = router;