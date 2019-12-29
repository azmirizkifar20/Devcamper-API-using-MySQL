const Bootcamp = require('../models/bootcamp');

// @desc    Create bootcamp
// @route   POST /api/bootcamps
// @access  Private
exports.createBootcamp = (req, res, next) => {
    var data = { ...req.body };

    Bootcamp.createBootcamp(res, next, data);
};

// @desc    Get all bootcamps
// @route   GET /api/bootcamps
// @access  Public
exports.getBootcamps = (req, res, next) => {
    // select fields
    if (req.query.select) {
        const fields = req.query.select.split(',');
        Bootcamp.getBootcamps(res, next, fields, req.query.sort);
    } else {
        Bootcamp.getBootcamps(res, next);
    }
};

// @desc    Get single bootcamp data
// @route   GET /api/bootcamps/:id
// @access  Public
exports.getBootcamp = (req, res, next) => {
    // select fields
    if (req.query.select) {
        const fields = req.query.select.split(',');
        Bootcamp.getBootcamp(res, next, req.params.id, fields);
    } else {
        Bootcamp.getBootcamp(res, next, req.params.id);
    }
};

// @desc    Update bootcamp data
// @route   PUT /api/bootcamps/:id
// @access  Private
exports.updateBootcamp = (req, res, next) => {
    var data = { ...req.body };

    Bootcamp.updateBootcamp(res, next, req.params.id, data);
};

// @desc    Delete bootcamp data
// @route   DELETE /api/bootcamps/:id
// @access  Private
exports.deleteBootcamp = async (req, res, next) => {
    Bootcamp.deleteBootcamp(res, next, req.params.id);
};
