var Sequelize = require('sequelize'),
    db_config = require('../db');

let sequelize_conn = db_config.sequelize;
let lookUp = require('./lookUp');
let church = require('./church');

let ContactType = lookUp.ContactType;
let Profession = lookUp.Profession;
let Parish = lookUp.Parish;
let Church = church.Church;
let Skill = lookUp.Skill;

var Visitor = sequelize_conn.define('churchVisitor', {
    title: {
        type: Sequelize.STRING
    },
    fullName: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.TEXT
    },
    telephone: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    guestOf: {
        type: Sequelize.STRING
    },
    reasonVisiting: {
        type: Sequelize.STRING
    },
    ageGroup: {
        type: Sequelize.ENUM('7-12', '13-18', '19-35', '36-59', '60+'),
    },
    dateCompleted: {
        type: Sequelize.DATEONLY
    }
});


// visitor-church relationship
Visitor.belongsTo(Church, { foreignKey: 'church_id' });
Church.hasMany(Visitor, { as: 'Vistors', onDelete: 'CASCADE' });

module.exports = {
    Visitor: Visitor
}