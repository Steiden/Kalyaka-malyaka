const Month = require("../models/month");

// * Импорт
const checkData = require("../helpers/checkData");

// * Добавление месяца
function addMonth(req, res) {
    const { name, nameRus, countDays, price } = req.body;

    // ? Проверка введенных значений
    if (checkData(name, nameRus, countDays, price)) {
        return res.status(400).json({ message: "Заполните все поля!" });
    }

    let month = new Month({
        name,
        nameRus,
        countDays,
        price,
    });

    month
        .save()
        .then((month) => res.status(200).json(month))
        .catch((err) => res.status(500).json(err));
}

// * Получение месяцев
function getMonth(req, res) {
    Month.find()
        .then((month) => res.status(200).json(month))
        .catch((err) => res.status(500).json(err));
}

// * Получение конкретного месяца
function getMonthById(req, res) {
    const monthId = req.params.id;

    Month.findById(monthId)
        .then((month) => res.status(200).json(month))
        .catch((err) => res.status(500).json(err));
}

// * Удаление месяца
function deleteMonth(req, res) {
    const monthId = req.params.id;

    Month.findByIdAndDelete(monthId)
        .then(() => res.status(200).json({ message: "Order deleted successfully" }))
        .catch((err) => res.status(500).json(err));
}

// * Обновление месяца
function updateMonth(req, res) {
    const monthId = req.params.id;
    const { name, nameRus, countDays, price } = req.body;

    // ? Проверка введенных значений
    if (checkData(name, nameRus, countDays, price)) {
        return res.status(400).json({ message: "Заполните все поля!" });
    }

    Order.findByIdAndUpdate(monthId, { name, nameRus, countDays, price })
        .then((month) => res.status(200).json({month: month, message: "Order updated successfully" }))
        .catch((err) => res.status(500).json(err));
}

module.exports = {
    addMonth,
    getMonth,
    getMonthById,
    deleteMonth,
    updateMonth,
};
