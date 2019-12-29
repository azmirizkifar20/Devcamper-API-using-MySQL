const errorHandler = require('./middleware/error');
const newsRoute = require('./routes/bootcamp');
const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const color = require('colors');
const app = express();
const PORT = process.env.PORT || 5000;

// load env vars
dotenv.config({ path: './config/config.env' });

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// set body-parser
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

// set routes
app.use('/api/bootcamps', newsRoute);

// set error middleware
app.use(errorHandler);

// buat server
app.listen(PORT, () =>
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue.underline)
);
