const router = require("express").Router();

const OrderHistory = require("../models/orderHistorySchema");

router.post("/addOrder", async (req, res) => {
  const email = req.body.email;
  const data = new OrderHistory({
    email: email,
    timestamp: new Date().toLocaleString(undefined, {
      timeZone: "Asia/Kolkata",
    }),
    collected: false,
  });
  const order = await data.save();
  res.send(order._id);
});

module.exports = router;
