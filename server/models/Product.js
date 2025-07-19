const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100,
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    promotionalPrice: {
        type: Number,
        min: 0,
        validate: {
            validator: function (value) {
                return value < this.price;
            },
            message: 'Promotional price must be less than the regular price'
        }
    },
    description: {
        type: String,
        trim: true,
        default: ''
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
