const mongoose = require('mongoose');

const ReactFormDataSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    payment: {
        type: Boolean,
        required: true
    },
    timestamp: {
        type: String,
        required: true
    }
   
});

const Order = mongoose.model('Order', ReactFormDataSchema);
module.exports = Order;