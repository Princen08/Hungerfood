const mongoose = require('mongoose');

const ReactFormDataSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        ref: 'Item'
    },
    count: {
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
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    src: {
        type: String
    }

});

const Order = mongoose.model('Order', ReactFormDataSchema);
module.exports = Order;