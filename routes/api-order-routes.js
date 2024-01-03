const express = require("express");
const {
    addOrder,
    getOrder,
    getOrderById,
    deleteOrder,
    updateOrder
} = require("../controllers/api-order-controller");

const router = express.Router();

// * Добавление заказа
router.post('/api/add-order', addOrder);

// * Получение заказов
router.get('/api/get-order', getOrder);

// * Получение конкретного заказа
router.get('/api/get-order/:id', getOrderById);

// * Удаление заказа
router.delete('/api/delete-order/:id', deleteOrder);

// * Обновление заказа
router.put('/api/update-order/:id', updateOrder);

module.exports = router;