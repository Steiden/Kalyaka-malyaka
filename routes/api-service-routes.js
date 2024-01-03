const express = require("express");
const {
    addService,
    getService,
    getServiceById,
    deleteService,
    updateService
} = require("../controllers/api-service-controller");

const router = express.Router();

// * Добавление сервиса
router.post('/api/add-service', addService);

// * Получение сервисов
router.get('/api/get-service', getService);

// * Получение конкретного сервиса
router.get('/api/get-service/:id', getServiceById);

// * Удаление сервиса
router.delete('/api/delete-service/:id', deleteService);

// * Обновление сервиса
router.put('/api/update-service/:id', updateService);

module.exports = router;