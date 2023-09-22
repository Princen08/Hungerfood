const router = require("express").Router();

const OrderHistory = require("../models/orderHistorySchema");

router.post("/addOrder", async (req, res) => {
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

router.get("/getOrder", async (req, res) => {
  const email = req.query.email;
  const collected = false;
  OrderHistory.find({ email: email, collected: collected}).then(function (data, docs) {
    res.send(data);
  });
});

module.exports = router;
