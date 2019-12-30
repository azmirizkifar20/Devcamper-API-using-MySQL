const {
    createBootcamp,
    getBootcamps,
    getBootcamp,
    updateBootcamp,
    deleteBootcamp,
    bootcampPhotoUpload
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

router.route('/:id/photo').put(bootcampPhotoUpload);

module.exports = router;
