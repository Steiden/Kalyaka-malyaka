const express = require("express");
const mongoose = require('mongoose');
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");

const apiOrderRoutes = require("./routes/api-order-routes");

const app = express();

const PORT = 3000;
const db = `mongodb+srv://steiden:C3C2SZJLKh9rAsID@main.hdz1pvg.mongodb.net/Kalyaka-Malyaka?retryWrites=true&w=majority`;

// * Подключение к БД
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => console.log("Connected to DB"))
    .catch((err) => console.log(err))

// * Создание сервера
app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`Server is running on port ${PORT}`);
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

app.use((res, req) => {
    res.status(404);
});