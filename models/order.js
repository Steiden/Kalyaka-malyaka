const { ObjectId } = require('mongodb');
const { Schema, model} = require('mongoose');


const Order = new Schema({
    month_id: {
        type: ObjectId,
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
    service_id: {
        type: ObjectId,
        required: false
    }
}, { timestamps: true });

module.exports = model("Order", Order);