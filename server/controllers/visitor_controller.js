var Sequelize = require('sequelize');
const Op = Sequelize.Op;


let visitor = require('../models/visitor');
let Visitor = visitor.Visitor;
// let Schooling = member.Schooling;
// let MemberContact = member.MemberContact;
// let MemberSkill = member.MemberSkill;

let church = require('../models/church');
let Church = church.Church

// let lookUp = require('../models/lookUp');
// let Parish = lookUp.Parish;
// let ContactType = lookUp.ContactType;
// let Month = lookUp.Month;
// let Profession = lookUp.Profession;
// let Skill = lookUp.Skill;

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
    getChurchVisitors: get_church_visitors
}