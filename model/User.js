const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: [
        {
            _id: {
                type: Schema.Types.ObjectId,
                ref: 'product'
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    phone: {
        type: String,
    },
    Role: [
        {
            type: String
        }
    ],
    tokenVerify: {
        type: String
    },
    OTP: {
        type: String
    },
    basic_information: {
        country: {
            type: String
        },
        flag: {
            type: String
        },
        address: {
            type: String
        },
        city: {
            type: String
        },
        city_code: {
            type: String
        }
    },
    avatar: {
        type: String
    },
    verified: {
        type: Boolean,
        required: true
    },
    tokenChangePassword: {
        type: String
    }
})

module.exports = mongoose.model('user', User);