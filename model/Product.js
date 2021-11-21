const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image_urls: [
        {
            type: String
        }
    ],
    in_stock: {
        type: Boolean,
        required: true
    },
    regular_price: {
        type: Number,
        required: true
    },
    category: {
        type: String
    },
    sale_percent: {
        type: Number
    },
    last_price: {
        type: Number
    }
})

module.exports = mongoose.model('product', ProductSchema);