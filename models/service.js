const { Schema, model} = require('mongoose');


const Service = new Schema({
    name: {
        type: String,
        required: true,
    },
    nameRus: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }

}, { timestamps: true });

module.exports = model("Service", Service);