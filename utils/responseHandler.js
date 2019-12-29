const responseData = function(response, statusCode, values) {
    var data = {
        succes: true,
        data: values
    };
    response.status(statusCode).json(data);
    response.end();
};

const responseMessage = function(response, statusCode, message) {
    var data = {
        succes: true,
        message: message
    };
    response.status(statusCode).json(data);
    response.end();
};

module.exports = { responseData, responseMessage };
