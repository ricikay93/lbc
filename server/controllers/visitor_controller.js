var Sequelize = require('sequelize')
db_config = require('../db');

const Op = Sequelize.Op;
let sequelize_conn = db_config.sequelize;

let visitor = require('../models/visitor');
let Visitor = visitor.Visitor;
// let Schooling = member.Schooling;
// let MemberContact = member.MemberContact;
// let MemberSkill = member.MemberSkill;

let church = require('../models/church');
let Church = church.Church



// queries for filters/autocomplete functionalities

var get_parent_nodes = function(req, res) {

    sequelize_conn.query('SELECT ifnull(substr(fullName,1, 1), "unknown") as parent, COUNT(*) AS `total` ' +
            'FROM churchVisitors GROUP BY parent order by fullName desc', {
                type: Sequelize.QueryTypes.SELECT
            })
        .then(churchVisitors => {
            console.log(churchVisitors);
            res.json(churchVisitors);
        });
};


var get_inviter_autocomplete = function(req, res) {
    var val = req.params.lookup;
    sequelize_conn.query("select distinct c.guestOf from churchVisitors c where " +
            " c.guestOf is not null and c.guestOf like '%" + val + "%'", { type: Sequelize.QueryTypes.SELECT })
        .then(churchVisitors => {
            console.log(churchVisitors);
            res.json(churchVisitors);
        });
};

var get_children_nodes = function(req, res) {
    var val = req.params.letter;

    sequelize_conn.query("select id, fullName, title from churchVisitors where " +
            " fullName like '" + val + "%' order by 'asc'", { type: Sequelize.QueryTypes.SELECT })
        .then(churchVisitors => {
            console.log(churchVisitors);
            res.json(churchVisitors);
        });
}

var add_visitor = function(req, res) {
    Visitor.create(req.body).then(function(result) {
        res.json({ message: 'Visitor saved successfully.' });
    }, function(err) {
        res.json({ message: 'Error saving visitor: ' + err });
    });
};

var edit_visitor = function(req, res) {
    Visitor.update(req.body, {
        where: {
            id: req.params.code
        }
    }).then(function(result) {
        res.json({ message: 'Visitor updated successfully' });
    }, function(err) {
        res.json({ message: 'Error updating visitor with id ' + req.params.code + ': ' + err });
    });
};

var delete_visitor = function(req, res) {
    Visitor.destroy({
        where: {
            id: req.params.code
        }
    }).then(function(result) {
        res.json({ message: 'Visitor deleted successfully' });
    }, function(err) {
        res.json({ message: 'Error deleting visitor with id ' + req.params.code + ': ' + err });
    });
};

var get_visitor = function(req, res) {
    Visitor.find({
        where: {
            id: req.params.code
        }
    }).then(function(result) {
        res.json(result);
    }, function(err) {
        res.json({ message: 'Error loading visitor with id ' + req.params.code + ': ' + err });
    });
}

var get_church_visitors = function(req, res) {
    Visitor.findAll({
        where: {
            church_id: req.params.church
        }
    }).then(function(result) {
        res.json(result);
    }, function(err) {
        res.json({ message: 'Error loading visitors from church with id ' + req.params.church + ': ' + err });
    });

};

var get_all_visitors = function(req, res) {
    Visitor.findAll().then(function(result) {
        res.json(result);
    }, function(err) {
        res.json({ message: 'Error loading visitors from church : ' + err });
    });
};

module.exports = {
    getAllVisitors: get_all_visitors,
    getVisitorByCode: get_visitor,
    addVisitor: add_visitor,
    updateVisitor: edit_visitor,
    deleteVisitor: delete_visitor,
    getChurchVisitors: get_church_visitors,
    getParentNodes: get_parent_nodes,
    getInviteesAutoComplete: get_inviter_autocomplete,
    getVisitorsByLetter: get_children_nodes,
    getInvitersAutoComplete: get_inviter_autocomplete
}