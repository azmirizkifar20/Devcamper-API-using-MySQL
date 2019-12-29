const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // log error
    console.log(error);

    if (err.code == 'ER_BAD_FIELD_ERROR') {
        const message = 'Invalid field or id!';
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server error'
    });
};

module.exports = errorHandler;
