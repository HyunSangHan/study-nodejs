var express = require('express');
var app = express();

var morgan = require('morgan');
var users = [
    {id: 1, name: 'marco'},
    {id: 2, name: 'anna'},
    {id: 3, name: 'egoing'},
];

app.use(morgan('dev'));

app.get('/users', function(req, res) {
    res.json(users);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});

module.exports = app;