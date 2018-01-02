var Sequelize = require('sequelize'),
    db_config = require('../db');

let sequelize_conn = db_config.sequelize;
let lookUp = require('./lookUp');
let church = require('./church');
let member = require('./member');

let Church = church.Church;
let Member = member.Member;

var Position = sequelize_conn.define('position', {
    position: { type: Sequelize.STRING }
});

var Group = sequelize_conn.define('group', {
    position: { type: Sequelize.STRING }
});

var Portfolio = sequelize_conn.define('portfolio', {
    member_id: {
        type: Sequelize.INTEGER,

        references: {
            // This is a reference to another model
            model: Member,

            // This is the column name of the referenced model
            key: 'id',
        }
    },
    church_id: {
        type: Sequelize.INTEGER,

        references: {
            // This is a reference to another model
            model: Church,

            // This is the column name of the referenced model
            key: 'id',
        }
    },
    position_id: {
        type: Sequelize.INTEGER,

        references: {
            // This is a reference to another model
            model: Position,

            // This is the column name of the referenced model
            key: 'id',
        }
    },
    group_id: {
        type: Sequelize.INTEGER,

        references: {
            // This is a reference to another model
            model: Group,

            // This is the column name of the referenced model
            key: 'id',
        }
    }
});


module.exports = {
    Position: Position,
    Group: Group,
    Portfolio: Portfolio
}