var Sequelize = require('sequelize'),
    db_config = require('../db');

let sequelize_conn = db_config.sequelize;
let lookUp = require('./lookUp');
let circuitModel = require('./circuit');

let Parish = lookUp.Parish;
let Circuit = circuitModel.Circuit;

var Church = sequelize_conn.define('circuitChurch', {
    church: { type: Sequelize.STRING, unique: true },
    seatQuota: { type: Sequelize.INTEGER, defaultValue: 1 },
    dateStarted: { type: Sequelize.DATEONLY },
    churchStreet: { type: Sequelize.STRING },
    churchTown: { type: Sequelize.STRING }
});

var ChurchMission = sequelize_conn.define('churchMission', {
    churchMission: { type: Sequelize.TEXT, unique: true }
});

var ChurchContact = sequelize_conn.define('churchContact', {
    churchContact: { type: Sequelize.TEXT, unique: true }
});

// church-circuit relationship
Church.belongsTo(Circuit);
Circuit.hasOne(Church);

// church-contact relationship
Church.hasMany(ChurchContact);
ChurchContact.belongsTo(Church);

// church-mission relationship
Church.hasMany(ChurchMission);
ChurchMission.belongsTo(Church);

module.exports = {
    Church: Church,
    ChurchContact: ChurchContact,
    ChurchMission: ChurchMission
}