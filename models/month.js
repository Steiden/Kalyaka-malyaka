const { Schema, model} = require('mongoose');

const Month = new Schema({
    name: {
        type: String,
        required: true
    },
    nameRus: {
        type: String,
        required: true
    },
    countDays: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }

}, { timestamps: true });

module.exports = model("Month", Month);