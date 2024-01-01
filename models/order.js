const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
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

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;