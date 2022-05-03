const express = require('express');
const { validate } = require('express-validation');
const recordController = require('../../controllers/record.controller');
const { getRecords } = require('../../validations/record.validation');

const router = express.Router();

router.route('/').post(validate(getRecords), recordController.get);

module.exports = router;
