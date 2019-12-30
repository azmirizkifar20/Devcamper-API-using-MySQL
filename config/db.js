const mysqlModel = require('mysql-model');
const colors = require('colors');
const dotenv = require('dotenv');

// load env vars
dotenv.config({ path: './config/config.env' });

const AppModel = mysqlModel.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

console.log('MySQL Connected bro!'.blue);

module.exports = AppModel;
