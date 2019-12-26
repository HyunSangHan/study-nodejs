const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite',
    logging: false // 쿼리문이 불필요하게 로그로 찍히지 않도록 해준다.
});

const User = sequelize.define('User', {
    name: Sequelize.STRING
})

module.exports = { Sequelize, sequelize, User };