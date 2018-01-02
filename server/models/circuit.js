var Sequelize = require('sequelize'),
    db_config = require('../db');

let sequelize_conn = db_config.sequelize;
let lookUp = require('./lookUp');

let Parish = lookUp.Parish;

/**
 * This model deals with a group of churches
 */
var Circuit = sequelize_conn.define('circuit', {
    circuit: { type: Sequelize.STRING, unique: true }
});

// circuit-parish relationship
Circuit.belongsTo(Parish);
Parish.hasOne(Circuit);

module.exports = {
    Circuit: Circuit
}