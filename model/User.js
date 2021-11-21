const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
            productId: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'product'
            },
            quantity: {
                type: Number
            },
            
        }
    ],
    phone: {
        type: String,
        required: true
    },
    Role: [
        {
            type: String,
            required: true
        }
    ],
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
    tokenVerify: {
        type: String
    },
    OTP: {
        type: String
    },
    avatar: {
        type: String
    }
});

module.exports = mongoose.model('user', UserSchema);