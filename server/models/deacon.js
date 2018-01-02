var Sequelize = require('sequelize'),
    db_config = require('../db');

let sequelize_conn = db_config.sequelize;
let lookUp = require('./lookUp');
let church = require('./church');
let member = require('./member');

let Church = church.Church;
let Member = member.Member;

Member.belongsToMany(Church, { as: 'Church', through: ChurchDeacon, foreignKey: 'deacon_id' });
Church.belongsToMany(Church, { as: 'Deacon', through: ChurchDeacon, foreignKey: 'church_id' })