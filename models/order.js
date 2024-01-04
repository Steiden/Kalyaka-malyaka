const { Schema, model} = require('mongoose');


const Order = new Schema({
    month: {
        type: String,
        required: true
    },
    fullNameChild: {
        type: String,
        required: true
    },
    countDays: {
        type: Number,
        required: true
    },
    otherService: {
        type: String,
        required: false
    }
}, { timestamps: true });

module.exports = model("Order", Order);