const router = require("express").Router();

const OrderHistory = require("../models/orderHistorySchema");

router.post("/addOrder", async (req, res) => {
  const email = req.body.email;
  const data = new OrderHistory({
    email: email,
    collected: false,
  });
  const order = await data.save();
  console.log(order);
  res.send(order._id);
});

module.exports = router;
