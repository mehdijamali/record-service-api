const express = require('express');
const recordRoutes = require('./records');

const router = express.Router();

router.use('/records', recordRoutes);

module.exports = router;
