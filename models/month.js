const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const monthSchema = new Schema({
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

const Month = mongoose.model("Month", monthSchema);
module.exports = Month;