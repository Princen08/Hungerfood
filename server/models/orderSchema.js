const mongoose = require("mongoose");

const Item = require("./itemSchema")

const cartItem = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item"
  },
  count: {
    type:Number,
    default: 1
  }
})

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true
  },
  items: [cartItem]
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
