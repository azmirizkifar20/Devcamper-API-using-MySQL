const connectDB = require('../config/db');
const ErrorResponse = require('../utils/errorResponse');
const { responseData, responseMessage } = require('../utils/responseHandler');

const Bootcamp = connectDB.extend({
    tableName: 'bootcamp'
});
const bootcamp = new Bootcamp();

// create bootcamp
exports.createBootcamp = async (res, next, data) => {
    await bootcamp.find('all', { where: `name = '${data.name}'` }, async (err, rows, field) => {
        if (err) return next(err);

        // if name already exists
        if (rows.length) {
            return next(new ErrorResponse('name already used, try another name!', 400));
        }

        // insert data
        const bootcamp = await new Bootcamp(data);
        bootcamp.save((err, result) => {
            if (err) return next(err);

            // output response
            responseData(res, 201, bootcamp);
        });
    });
};

// get bootcamp
exports.getBootcamps = async (res, next, fields, sort) => {
    await bootcamp.find('all', { fields: fields, group: sort }, (err, rows, field) => {
        if (err) return next(err);

        // output response
        responseData(res, 200, rows);
    });
};

// get single bootcamp
exports.getBootcamp = async (res, next, id, fields) => {
    await bootcamp.find('all', { where: `id = ${id}`, fields: fields }, (err, rows, field) => {
        if (err) return next(err);

        if (!rows.length) {
            return next(new ErrorResponse(`no data found with id = ${id}`, 404));
        }

        // output response
        responseData(res, 200, rows);
    });
};

// update bootcamp
exports.updateBootcamp = async (res, next, id, data) => {
    await bootcamp.find('all', { where: `id = ${id}` }, async (err, rows, field) => {
        if (err) return next(err);

        if (!rows.length) {
            return next(new ErrorResponse(`no data found with id = ${id}`, 404));
        }

        // run update code here
        const updateData = await new Bootcamp(data);
        updateData.set('id', id);

        updateData.save((err, result) => {
            if (err) return next(err);

            // output response
            responseData(res, 200, updateData);
        });
    });
};

// delete bootcamp
exports.deleteBootcamp = async (res, next, id) => {
    await bootcamp.find('all', { where: `id = ${id}` }, async (err, rows, field) => {
        if (err) return next(err);

        if (!rows.length) {
            return next(new ErrorResponse(`no data found with id = ${id}`, 404));
        }

        // remove the data
        bootcamp.set('id', id);
        bootcamp.remove();

        // output response
        responseMessage(res, 200, `${rows[0].name} removed!`);
    });
};
