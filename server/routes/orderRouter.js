const router = require("express").Router();

const OrderHistory = require("../models/orderHistorySchema");

const verifyJWT = require("../middleware/auth");

router.post("/addOrder", verifyJWT, async (req, res) => {
  const email = req.body.email;
  const itemsData = req.body.items;
  const data = new OrderHistory({
    email: email,
    timestamp: new Date().toLocaleString(undefined, {
      timeZone: "Asia/Kolkata",
    }),
    items: itemsData,
    collected: false
  });
  const order = await data.save();
  res.send(order._id);
});

router.get("/getOrder", verifyJWT, async (req, res) => {
  const email = req.query.email;
  const collected = false;
  OrderHistory.find({ email: email,collected: collected}).then(function (data, docs) {
    res.send(data);
  });
});

router.get("/getOrderById", verifyJWT, async (req, res) => {
  const email = req.query.email;
  const order_id = req.query.orderId;
  OrderHistory.find({_id: order_id, email: email}).then(function (data, docs) {
    res.send(data);
  });
});

module.exports = router;
