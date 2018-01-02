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

var Member = sequelize_conn.define('churchMember', {
    title: { type: Sequelize.STRING },
    firstName: { type: Sequelize.STRING },
    lastName: { type: Sequelize.STRING },
    isMale: { type: Sequelize.BOOLEAN, defaultValue: true },
    birthday: { type: Sequelize.DATEONLY },
    maritalStatus: { type: Sequelize.ENUM('Single', 'Married', 'Divourced'), default: 'Single' },
    picture: { type: Sequelize.STRING },
    street: { type: Sequelize.STRING },
    town: { type: Sequelize.STRING },
    emergencyContactName: { type: Sequelize.STRING },
    emergencyContactRelationship: { type: Sequelize.STRING },
    emergencyContactTelephone: { type: Sequelize.STRING }
});

var MemberContact = sequelize_conn.define('memberContact', {
    memberContact: { type: Sequelize.TEXT, unique: true }
});

var MemberSkill = db_config.seq_config.conn.define('memberSkill', {});


var Schooling = sequelize_conn.define('memberSchooling', {
    school: { type: Sequelize.STRING },
    years: { type: Sequelize.STRING },
    qualification: { type: Sequelize.TEXT }
});

// member-profession relationship
Member.belongsTo(Profession, { foreignKey: 'profession_id' });
Profession.hasMany(Member);

// member-parish association
Member.belongsTo(Parish, { foreignKey: 'parish_id', as: 'Parish' });
Parish.hasOne(Member);

// member-church relationship
Member.belongsTo(Church, { foreignKey: 'church_id' });
Church.hasMany(Member);

// member-contact relationship
MemberContact.belongsTo(Member, { foreignKey: 'member_id' });
Member.hasMany(MemberContact, { as: 'Contacts', onDelete: 'CASCADE' });

// member-schooling relationship
Schooling.belongsTo(Member, { foreignKey: 'member_id' });
Member.hasMany(Schooling, { as: 'Schooling', onDelete: 'CASCADE' });

// member-skill relationship
Skill.belongsToMany(Member, { as: 'Member', through: MemberSkill, foreignKey: 'member_id' });
Member.belongsToMany(Skill, { as: 'Skill', through: MemberSkill, foreignKey: 'skill_id' });


module.exports = {
    Member: Member,
    Schooling: Schooling,
    MemberContact: MemberContact,
    MemberSkill: MemberSkill
}