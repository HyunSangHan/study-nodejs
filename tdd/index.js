var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var user = require('./api/user'); // ./api/user/index.js 라고까지 굳이 써줄 필요는 없다.

if (process.env.NODE_ENV !== "test") {
    app.use(morgan('dev')); //middleware를 사용할 때에는 use를 쓴다.
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', user) // /users에 대한 라우팅은 user라는 모듈이 담당한다는 의미.

module.exports = app;