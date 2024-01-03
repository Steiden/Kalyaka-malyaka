const Order = require("../models/order");

// * Импорт
const checkData = require("../helpers/checkData");

// * Добавление заказа
function addOrder(req, res) {
    const { month, fullNameChild, countDays, otherService } = req.body;

    let order;

    // ? Проверка введенных значений
    if(checkData(month, fullNameChild, countDays)) {
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

// * Получение заказов
function getOrder(req, res) {
    Order.find()
        .then(order => res.status(200).json(order))
        .catch(err => res.status(500).json(err))
}

// * Получение конкретного заказа
function getOrderById(req, res) {
    const orderId = req.params.id;

    Order.findById(orderId)
        .then(order => res.status(200).json(order))
        .catch(err => res.status(500).json(err))
}

// * Удаление заказа
function deleteOrder(req, res) {
    const orderId = req.params.id;

    Order.findByIdAndDelete(orderId)
        .then(() => res.status(200).json({ message: "Order deleted successfully" }))
        .catch(err => res.status(500).json(err));
}

// * Обновление заказа
function updateOrder(req, res) {
    const orderId = req.params.id;
    const { month, fullNameChild, countDays, otherService } = req.body;

    // ? Проверка введенных значений
    if (checkData(month, fullNameChild, countDays)) {
        return res.status(400).json({ message: "Please provide all required input values" });
    }

    if (!otherService) {
        Order.findByIdAndUpdate(orderId, { month, fullNameChild, countDays })
            .then((order) => res.status(200).json({ order: order, message: "Order updated successfully" }))
            .catch(err => res.status(500).json(err));
    }
    else {
        Order.findByIdAndUpdate(orderId, { month, fullNameChild, countDays, otherService })
            .then((order) => res.status(200).json({ order: order, message: "Order updated successfully" }))
            .catch(err => res.status(500).json(err));
    }
}


module.exports = {
    addOrder,
    getOrder,
    getOrderById,
    deleteOrder,
    updateOrder
}