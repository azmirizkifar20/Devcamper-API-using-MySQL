const {
    createBootcamp,
    getBootcamps,
    getBootcamp,
    updateBootcamp,
    deleteBootcamp
} = require('../controllers/bootcamp');
const express = require('express');
const router = express.Router();

router
    .route('/')
    .get(getBootcamps)
    .post(createBootcamp);

router
    .route('/:id')
    .get(getBootcamp)
    .put(updateBootcamp)
    .delete(deleteBootcamp);

module.exports = router;
