const express = require('express');
const router = express.Router();

let circuitController = require('../controllers/circuit_controller');

router.route('/')
    .get(circuitController.getAllCircuits)
    .post(circuitController.addCircuit);

router.route('/:code')
    .get(circuitController.getCircuitByCode)
    .put(circuitController.updateCircuit)
    .delete(circuitController.deleteCircuit);


module.exports = router;