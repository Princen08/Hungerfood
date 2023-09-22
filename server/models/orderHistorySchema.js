const mongoose = require("mongoose");

const subDataSchema = new mongoose.Schema({
   id: Number,
   count: Number
});
const ReactFormDataSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
  items:[subDataSchema],
  collected: {
    type: Boolean,
    required: true,
  },
});

const OrderHistory = mongoose.model("OrderHistory", ReactFormDataSchema);
module.exports = OrderHistory;
