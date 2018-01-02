var Sequelize = require('sequelize');
const Op = Sequelize.Op;


let circuit = require('../models/circuit');
let Circuit = circuit.Circuit;

var add_circuit = function(req, res) {
    var newCircuit = new Circuit(req.body);

    newCircuit.save().then(function(result) {
        res.json({ message: 'Circuit saved successfully.' });
    }, function(err) {
        res.json({ message: 'Error saving circuits: ' + err });
    });
};

var get_circuits = function(req, res) {
    Circuit.findAll().then(function(result) {
        res.json(result);
    }, function(err) {
        res.json({ message: 'Error finding circuits: ' + err });
    });
};

var get_a_circuit = function(req, res) {
    Circuit.find({
        where: {
            id: req.params.code
        }
    }).then(function(result) {
        res.json(result);
    }, function(err) {
        res.json({ message: 'Error finding circuit with id ' + req.params.code + ': ' + err });
    });
};

var update_a_circuit = function(req, res) {
    Circuit.update(req.body, {
        where: {
            id: req.params.code
        }
    }).then(function(result) {
        res.json({ message: 'Circuit updated successfully' });
    }, function(err) {
        res.json({ message: 'Error updating circuit with id ' + req.params.code + ': ' + err });
    });
}

var delete_a_circuit = function(req, res) {
    Circuit.destroy({
        where: {
            id: req.params.code
        }
    }).then(function(result) {
        res.json({ message: 'Circuit deleted successfully' });
    }, function(err) {
        res.json({ message: 'Error finding circuit with id ' + req.params.code + ': ' + err });
    });
};

// var delete_circuits = function(req, res) {
//     var ids = req.body.arr;
//     Circuit.destroy({
//         where: {
//             id: { in: ids }
//         }
//     }).then(function(result) {
//         res.json({ message: 'Circuits deleted successfully' });
//     }, function(err) {
//         res.json({ message: 'Error finding circuits with id ' + req.params.code + ': ' + err });
//     });
// };

module.exports = {
    addCircuit: add_circuit,
    getAllCircuits: get_circuits,
    getCircuitByCode: get_a_circuit,
    updateCircuit: update_a_circuit,
    deleteCircuit: delete_a_circuit
        // deleteCircuits: delete_circuits
}