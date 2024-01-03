const Service = require("../models/service");

// * Импорт
const checkData = require("../helpers/checkData");

// * Добавление сервиса
function addService(req, res) {
    const { name, price } = req.body;

    // ? Проверка введенных значений
    if(checkData(name, price)) {
        return res.status(400).json({message: "Заполните все поля!"});
    }

    let service = new Service(name, price);

    service.save()
        .then(service => res.status(200).json(service))
        .catch(err => res.status(500).json(err))
}

// * Получение сервисов
function getService(req, res) {
    Service.find()
        .then(service => res.status(200).json(service))
        .catch(err => res.status(500).json(err))
}

// * Получение конкретного сервиса
function getServiceById(req, res) {
    const serviceId = req.params.id;

    Service.findById(serviceId)
        .then(service => res.status(200).json(service))
        .catch(err => res.status(500).json(err))
}

// * Удаление сервиса
function deleteService(req, res) {
    const serviceId = req.params.id;

    Service.findByIdAndDelete(serviceId)
        .then(() => res.status(200).json({ message: "Service deleted successfully" }))
        .catch(err => res.status(500).json(err));
}

// * Обновление сервиса
function updateService(req, res) {
    const serviceId = req.params.id;
    const { name, price } = req.body;

    // ? Проверка введенных значений
    if (checkData(name, price)) {
        return res.status(400).json({ message: "Please provide all required input values" });
    }

    Service.findByIdAndUpdate(serviceId, { name, price })
        .then((service) => res.status(200).json({ service: service, message: "Service updated successfully" }))
        .catch(err => res.status(500).json(err));
}


module.exports = {
    addService,
    getService,
    getServiceById,
    deleteService,
    updateService
}