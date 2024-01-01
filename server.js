const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

const PORT = 3000;


//* Создание сервера
app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`Server is running on port ${PORT}`);
});


app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.urlencoded( { extended: false }));
app.use(express.static("./public"));

//* GET запросы
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, "public/views", 'index.html'));
});