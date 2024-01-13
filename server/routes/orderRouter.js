const router = require("express").Router();

const OrderHistory = require("../models/orderHistorySchema");

const verifyJWT = require("../middleware/auth");

router.post("/addOrder", verifyJWT, async (req, res) => {
  const email = req.body.email;
  const itemsData = req.body.items;
  const data = new OrderHistory({
    email: email,
    items: itemsData,
    collected: false
  });
  const order = await data.save();
  return res.json({success: true, data:order._id});
});

router.get("/getOrder", verifyJWT, async (req, res) => {
  const email = req.query.email;
  const collected = false;
  const ordersData = await OrderHistory.find({email: email, collected: false});
  return res.json({success: true, data: ordersData});
});

router.get("/getOrderById", verifyJWT, async (req, res) => {
  const email = req.query.email;
  const order_id = req.query.orderId;
  OrderHistory.find({_id: order_id, email: email}).then(function (data, docs) {
    res.send(data);
  });
});

router.post("/updateOrder", async (req, res) => {
  const email = req.body.email;
  const orderId = req.body.orderId;
  let curr = await OrderHistory.findOne({ email: email, _id: orderId });
  curr.collected = true;
  await curr.save();
  res.send({ "message": "Updated successfully." });
});

module.exports = router;
