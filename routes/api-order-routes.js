const express = require("express");
const addOrder = require("../controllers/api-order-controller").addOrder;

const router = express.Router();


// Добавление заказа
router.post('/api/add-order', addOrder);

module.exports = router;