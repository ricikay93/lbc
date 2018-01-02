var Sequelize = require('sequelize'),
    db_config = require('../db');

let sequelize_conn = db_config.sequelize;

let lookUp = require('./lookUp');
let church = require('./church');

let Month = lookUp.Month;


var Event = sequelize_conn.define('event', {
    title: { type: Sequelize.STRING, unique: true },
    description: { type: Sequelize.TEXT },
    location: { type: Sequelize.TEXT },
    startDate: { type: Sequelize.DATEONLY },
    endDate: { type: Sequelize.DATEONLY, allowNull: true },
    startTime: { type: Sequelize.TIME, allowNull: true },
    endTime: { type: Sequelize.TIME, allowNull: true },
    isFullDay: { type: Sequelize.BOOLEAN, defaultValue: true },
    createdBy: { type: Sequelize.STRING }
});

var RecurringPattern = sequelize_conn.define('recurringPattern', {
    separationCount: { type: Sequelize.INTEGER, defaultValue: 0 },
    recurringType: {
        type: Sequelize.ENUM('Weekly', 'Monthly', 'Yearly', 'Daily'),
        default: 'Weekly'
    },
    dayOfWeek: {
        type: Sequelize.ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
        default: 'Monday'
    },
    weekOfMonth: { type: Sequelize.INTEGER },
    maxNumOfOccurances: { type: Sequelize.INTEGER, allowNull: true }
});

var EventInstanceException = sequelize_conn.define('eventInstanceException', {
    isRescheduled: { type: Sequelize.BOOLEAN },
    isCancelled: { type: Sequelize.BOOLEAN },
    startDate: { type: Sequelize.DATEONLY },
    endDate: { type: Sequelize.DATEONLY, allowNull: true },
    startTime: { type: Sequelize.TIME, allowNull: true },
    endTime: { type: Sequelize.TIME, allowNull: true },
    isFullDay: { type: Sequelize.BOOLEAN, defaultValue: true },
    createdBy: { type: Sequelize.STRING }
});



RecurringPattern.belongsTo(Month);
Month.hasMany(RecurringPattern);

Event.hasMany(RecurringPattern);
RecurringPattern.belongsTo(Event);

Event.belongsTo(Event, { foreignKey: 'parentEvent' });
Event.hasMany(Event, { as: 'Children' });

module.exports = {
    Event: Event,
    RecurringPattern: RecurringPattern,
    EventInstanceException: EventInstanceException
}