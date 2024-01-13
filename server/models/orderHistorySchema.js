const mongoose = require("mongoose");
const Item = require("./itemSchema")
const moment = require('moment');

const cartItem = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item"
  },
  count: {
    type:Number,
  }
})

const ReactFormDataSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  purchaseAt: {
    type: String,
    default: moment().utcOffset("+05:30").format('MMMM Do YYYY, h:mm:ss a')
  },
  items: [cartItem],
  collected: {
    type: Boolean,
    required: true,
  },
}, { timestamps: true });

const OrderHistory = mongoose.model("OrderHistory", ReactFormDataSchema);
module.exports = OrderHistory;
