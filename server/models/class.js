var Sequelize = require('sequelize'),
    db_config = require('../db');

let sequelize_conn = db_config.sequelize;
let lookUp = require('./lookUp');
let church = require('./church');

let Church = church.Church;

var Class = sequelize_conn.define('classes', {
    className: { type: Sequelize.STRING }
});

var ClassArea = sequelize_conn.define('classAreas', {
    area: { type: Sequelize.STRING }
});


Class.belongsTo(Church);
Church.hasMany(Class)

// class-area relationship
ClassArea.belongsTo(Class);
Class.hasMany(ClassArea);

// class-member(leader) relationship
Class.belongsToMany(Member, { as: 'Member', through: ClassLeader, foreignKey: 'member_id' });
Member.belongsToMany(Class, { as: 'Class', through: ClassLeader, foreignKey: 'class_id' });

module.exports = {
    Member: Member,
    Schooling: Schooling,
    MemberContact: MemberContact
}