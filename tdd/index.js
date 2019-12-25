var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');

app.use(morgan('dev')); //middleware를 사용할 때에는 use를 쓴다.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});

module.exports = app;