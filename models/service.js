const Order = mongoose.model("Order", orderSchema);


const Service = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    }

}, { timestamps: true });

module.exports = model("Service", Service);