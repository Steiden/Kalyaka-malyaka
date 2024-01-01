const Order = require("../models/order");


function addOrder(req, res) {
    const { month, fullNameChild, countDays, otherService } = req.body;

    let order;

    if(!month || !fullNameChild || !countDays) {
        return res.status(400).json({message: "Заполните все поля!"});
    }
    if(!otherService) {
        order = new Order({
            month,
            fullNameChild,
            countDays
        })
    }
    else {
        order = new Order({
            month,
            fullNameChild,
            countDays,
            otherService
        })
    }

    order.save()
        .then(order => res.status(200).json(order))
        .catch(err => res.status(500).json(err))
}

module.exports = {
    addOrder
}