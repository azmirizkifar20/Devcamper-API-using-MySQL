const mysqlModel = require('mysql-model');
const colors = require('colors');

const AppModel = mysqlModel.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'chevalier-api'
});

console.log('MySQL Connected bro!'.blue);

module.exports = AppModel;
