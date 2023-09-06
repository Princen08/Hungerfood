const mongoose = require('mongoose');

const ReactFormDataSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    collected: {
        type: Boolean, 
        required: true
    },
});

const OrderHistory = mongoose.model('OrderHistory', ReactFormDataSchema);
module.exports = OrderHistory;