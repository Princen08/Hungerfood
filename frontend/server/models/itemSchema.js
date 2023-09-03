const mongoose = require('mongoose');
const {Schema}  = require('mongoose');
const ReactFormDataSchema = new mongoose.Schema({
    id: {
       type: Number,
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

const Item = mongoose.model('Item', ReactFormDataSchema);
module.exports = Item;