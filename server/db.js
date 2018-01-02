var Sequelize = require('sequelize'),
    server_config = require('../server/config');



var sequelize = new Sequelize('null', 'null', 'null', server_config.development);


module.exports = {
    sequelize: sequelize
};