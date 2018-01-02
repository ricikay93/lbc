const router = require('express').Router();
const lookup = require('./lookup');
const circuit = require('./circuit');
const api = require('./api');

router.use('/lookup', lookup);
router.use('/circuits', circuit);
router.use('/', api);

module.exports = router