const mongoose = require('mongoose');
const {Schema}  = require('mongoose');
const ReactFormDataSchema = new mongoose.Schema({
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
});

const Item = mongoose.model('Item', ReactFormDataSchema);
module.exports = Item;