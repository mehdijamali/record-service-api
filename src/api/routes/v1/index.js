const express = require('express');
const recordRoutes = require('./records');
const docsRoutes = require('./docs');

const router = express.Router();

router.use('/records', recordRoutes);
router.use('/', docsRoutes);

module.exports = router;
