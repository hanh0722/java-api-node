const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    cover_image: {
        type: String,
        required: true
    },
    short_description: {
        type: String,
        required: true
    },
    time_created: {
        type: Number,
        required: true
    },
    is_public: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('blog', BlogSchema);