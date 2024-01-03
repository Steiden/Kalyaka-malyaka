// * Импорт библиотек
const express = require("express");
const mongoose = require('mongoose');
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

// * Импорт маршрутов
const apiOrderRoutes = require("./routes/api-order-routes");
const apiMonthRoutes = require("./routes/api-month-routes");
const apiServiceRoutes = require("./routes/api-service-routes");

const app = express();

// * Переменные
let PORT = process.env.PORT | 3000;
let db = process.env.DB;


// * Подключение к БД
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => console.log("Connected to DB"))
    .catch((err) => console.log(err))

// * Создание сервера
app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`Server is running`);
});

// * Настройка сервера
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./public"));


// * Загрузка главной страницы
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "public/views", "index.html"));
});

// * Подключение маршрутов
app.use(apiOrderRoutes);
app.use(apiMonthRoutes);
app.use(apiServiceRoutes);


// * Обработка ошибок
app.use((res, req) => {
    res.statusCode = 400;
});

// TODO Реализовать подгрузку Месяца и Сервиса с БД