const path = require('path');
const connectDB = require('../config/db');
const slugify = require('slugify');
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

        // generate slug & custom photo
        data.slug = slugify(data.name, { lower: true });
        data.photo = 'no-photo.jpg';

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

// upload photo
exports.uploadPhoto = async (res, next, id, fileSend) => {
    await bootcamp.find('all', { where: `id = ${id}` }, async (err, rows, field) => {
        if (err) return next(err);

        if (!rows.length) {
            return next(new ErrorResponse(`no data found with id = ${id}`, 404));
        }

        if (!fileSend) {
            return next(new ErrorResponse('Please upload a file', 400));
        }

        const file = fileSend.files;

        // Make sure the file is a photo
        if (!file.mimetype.startsWith('image')) {
            return next(new ErrorResponse('Please upload an image', 400));
        }

        // check file size
        if (file.size > process.env.MAX_FILE_UPLOAD) {
            return next(
                new ErrorResponse(
                    `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
                    400
                )
            );
        }

        // create custom filename
        file.name = `photo_${rows[0].slug}${path.parse(file.name).ext}`;

        // move file to static folder
        file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
            if (err) return next(new ErrorResponse('Problem with file upload', 500));

            const update = await new Bootcamp({ photo: file.name });
            update.set('id', id);

            update.save((err, result) => {
                if (err) return next(err);

                // output response
                responseData(res, 200, update);
            });
        });
    });
};
