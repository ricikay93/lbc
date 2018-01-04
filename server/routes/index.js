const router = require('express').Router();
const lookup = require('./lookup');
const circuit = require('./circuit');
const church = require('./church');
const api = require('./api');

router.use('/lookup', lookup);
router.use('/circuits', circuit);
router.use('/churches', church);


module.exports = router