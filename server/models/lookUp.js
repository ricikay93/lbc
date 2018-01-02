var Sequelize = require('sequelize'),
    db_config = require('../db');

let sequelize_conn = db_config.sequelize;

var Parish = sequelize_conn.define('parish', {
    code: { type: Sequelize.STRING(5), primaryKey: true },
    parish: { type: Sequelize.STRING, unique: true }
});

var ContactType = sequelize_conn.define('contactType', {
    contactFilter: {
        type: Sequelize.ENUM('churchOnly', 'personOnly', 'all'),
    },
    contactType: {
        type: Sequelize.STRING,
        unique: true
    }
});

var Profession = sequelize_conn.define('profession', {
    profession: {
        type: Sequelize.STRING
    }
});

var Skill = sequelize_conn.define('skill', {
    skill: {
        type: Sequelize.STRING
    }
});


var Month = sequelize_conn.define('month', {
    monthLongForm: {
        type: Sequelize.STRING,
        unique: true
    },
    monthShortForm: {
        type: Sequelize.STRING,
        unique: true
    }
});


module.exports = {
    Parish: Parish,
    ContactType: ContactType,
    Month: Month,
    Profession: Profession,
    Skill: Skill
}