const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;

// импорт пакетов и определение порта сервера

const app = express();

//отдаем статику
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

//тест сервера
app.get('/ping', function (req, res) {
    return res.send('pong');
});

//обслуживание html
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port, () => console.log(`Listening on port ${port}...`));