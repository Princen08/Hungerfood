const router = require("express").Router();
const moment = require('moment');

const OrderHistory = require("../models/orderHistorySchema");

const verifyJWT = require("../middleware/auth");

router.post("/addOrder", verifyJWT, async (req, res) => {
  const email = req.body.email;
  const itemsData = req.body.items;
  const data = new OrderHistory({
    email: email,
    items: itemsData,
    purchaseAt: moment().utcOffset("+05:30").format('MMMM Do YYYY, h:mm:ss a'),
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
  const curr = await OrderHistory.findOne({ email: email, _id: orderId });
  if(!curr) {
    return res.json({success: false, message:"Order does not exist."});
  }
  if(curr.collected) {
    return res.json({success: false, message:"Order already collected."});
  }
  curr.collected = true;
  await curr.save();
  return res.send({success:true, message: "Updated successfully." });
});

module.exports = router;
