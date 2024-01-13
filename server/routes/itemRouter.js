const router = require("express").Router();

const Item = require("../models/itemSchema");
const Order = require("../models/orderSchema");

const verifyJWT = require("../middleware/auth");
const User = require("../models/userSchema");

// get menu
router.get("/getMenu", verifyJWT, async (req, res) => {
  const itemList = await Item.find();
  return res.json({ success: true, data: itemList });
});

// get single item
router.get("/getItem", verifyJWT, async (req, res) => {
  const itemId = req.query.id;
  const item = await Item.findOne({ _id: itemId });
  if (item) {
    return res.json({ success: true, data: item });
  } else {
    return res.json({ success: false, message: "Item does not exist." })
  }
});

// add item to cart
router.post("/addItem", verifyJWT, async (req, res) => {
  const id = req.body.id;
  const email = req.body.email;
  const count = req.body.count;

  const itemData = await Item.findOne({ _id: id });
  const userData = await User.findOne({ email: email });

  if (!userData) {
    return res.json({ success: false, message: "User does not exist." });
  }

  if (!itemData) {
    return res.json({ success: false, message: "Item does not exist." });
  }
  const cartItemData = {
    item: itemData._id,
    count: count
  }
  const orderData = await Order.findOne({ user: userData._id });

  if (orderData) {
    orderData.items.push(cartItemData);
    await orderData.save();
  } else {
    const cartData = new Order({
      user: userData._id,
      items: [cartItemData]
    })
    await cartData.save();
  }
  return res.json({ success: true, message: "Item added sucessfully." });

});

// remove item from cart
router.post("/removeItem", verifyJWT, async (req, res) => {
  const id = req.body.id;
  const email = req.body.email;

  const itemData = await Item.findOne({ _id: id });
  const userData = await User.findOne({ email: email });

  if (!userData) {
    return res.json({ success: false, message: "User does not exist." });
  }

  if (!itemData) {
    return res.json({ success: false, message: "Item does not exist." });
  }

  const orderData = await Order.findOne({ user: userData._id });

  if (orderData) {
    orderData.items.remove({ item: itemData._id })
    await orderData.save();
  }
  return res.json({ success: true, message: "Item removed sucessfully." });
});

// get cart items
router.get("/getCartItems", verifyJWT, async (req, res) => {
  const email = req.query.email;

  const userData = await User.findOne({ email: email });

  if (!userData) {
    return res.json({ success: false, message: "User does not exist." });
  }
  const cartItemData = await Order.findOne({ user: userData._id });
  if (!cartItemData) {
    return res.json({ success: false, message: "Cart is empty." });
  }
  return res.json({ success: true, data: cartItemData.items });
});

// update item count
router.patch("/updateItem", verifyJWT, async (req, res) => {
  const id = req.body.id;
  const email = req.body.email;
  const type = req.body.type;
  
  const itemData = await Item.findOne({ _id: id });
  const userData = await User.findOne({ email: email });

  if (!userData) {
    return res.json({ success: false, message: "User does not exist." });
  }

  if (!itemData) {
    return res.json({ success: false, message: "Item does not exist." });
  }

  const orderData = await Order.findOne({ user: userData._id });

  if (orderData) {
    const newCount = parseInt(orderData.items.filter((currItem) => itemData._id.equals(currItem.item))[0].count) + type;
    await Order.updateOne({ _id: orderData._id, 'items.item': itemData._id }, { $set: { 'items.$.count': newCount } });
  }

  return res.json({ success: true, message: "Item count updated sucessfully." });
});

module.exports = router;
