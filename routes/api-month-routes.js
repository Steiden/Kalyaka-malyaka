const express = require("express");
const {
    addMonth,
    getMonth,
    getMonthById,
    deleteMonth,
    updateMonth
} = require("../controllers/api-month-controller");

const router = express.Router();

// * Добавление месяца
router.post('/api/add-month', addMonth);

// * Получение месяцев
router.get('/api/get-month', getMonth);

// * Получение конкретного месяца
router.get('/api/get-month/:id', getMonthById);

// * Удаление месяца
router.delete('/api/delete-month/:id', deleteMonth);

// * Обновление месяца
router.put('/api/update-month/:id', updateMonth);

module.exports = router;