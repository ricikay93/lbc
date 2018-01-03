var Sequelize = require('sequelize');
const Op = Sequelize.Op;


let lookUp = require('../models/lookUp');
let Parish = lookUp.Parish;
let ContactType = lookUp.ContactType;
let Month = lookUp.Month;
let Profession = lookUp.Profession;
let Skill = lookUp.Skill;

// parishes
var get_all_parishes = function(req, res) {
    Parish.findAll({
        attributes: ['code', 'parish']
    }).then(function(result) {
        res.json(result);
    }, function(err) {
        return { message: 'Error loading parishes. Please come back later.' + err };
    });
};

var get_a_parish = function(req, res) {
    Parish.findOne({
        attributes: ['code', 'parish'],
        where: {
            code: req.params.code
        }
    }).then(function(result) {
        res.json(result);
    }, function(err) {
        res.json({ message: 'Error loading parishes. Please refresh.' })
    });
};

// skills

var get_all_skills = function(req, res) {
    Skill.findAll().then(function(result) {
        res.json(result);
    }, function(err) {
        res.json({ message: 'Error loading skills: ' + err });
    });
};

var add_a_skill = function(req, res) {
    var newSkill = new Skill(req.body);

    newSkill.save().then(function(result) {
        res.json({ message: 'Skill has been added.' });
    }, function(err) {
        res.json({ message: 'Error saving skills: ' + err });
    });
};

var edit_a_skill = function(req, res) {
    Skill.update(req.body, {
        where: {
            id: req.params.code
        }
    }).then(function(result) {
        res.json({ message: "Skill updated successful!" });
    }, function(err) {
        res.json({ message: 'Error updating skill: ' + err });
    });
};

var get_a_skill = function(req, res) {
    Skill.findOne({
        where: {
            id: req.params.code
        }
    }).then(function(result) {
        res.json(result);
    }, function(err) {
        res.json({ message: 'Error loading skill: ' + err })
    });
};

// statuses

var get_all_statuses = function(req, res) {
    MaritalStatus.findAll().then(function(result) {
        res.json(result);
    }, function(err) {
        res.json({ message: 'Error loading marital statuses: ' + err })
    });
};

var get_a_status = function(req, res) {
    MaritalStatus.findOne({
        where: {
            code: req.params.code
        }
    }).then(function(result) {
        res.json(result);
    }, function(err) {
        res.json({ message: 'Error loading marital status. Please refresh.' })
    });
};

// church contacts

var get_church_contact_types = function(req, res) {
    ContactType.findAll({
        where: {
            [Op.or]: [{ contactFilter: 'churchOnly' }, { contactFilter: 'all' }]
        }
    }).then(function(result) {
        res.json(result);
    }, function(err) {
        res.json({ message: 'Error loading parishes: ' + err })
    });
};

var get_people_contact_types = function(req, res) {
    ContactType.findAll({
        where: {
            [Op.or]: [{ contactFilter: 'personOnly' }, { contactFilter: 'all' }]
        }
    }).then(function(result) {
        res.json(result);
    }, function(err) {
        res.json({ message: 'Error loading parishes: ' + err })
    });
};

var get_contact_types = function(req, res) {
    ContactType.findAll().then(function(result) {
        res.json(result);
    }, function(err) {
        res.json({ message: 'Error loading parishes: ' + err })
    });
};

var get_contact_type = function(req, res) {
    var code = req.params.code;

    lookUpModels.models.contactType.findOne({
        where: {
            id: code
        }
    }).then(function(result) {
        res.json(result);
    }, function(err) {
        res.json({ message: 'Error loading parishes: ' + err })
    });
};

var get_all_months = function(req, res) {

    Month.findAll().then(function(result) {
        res.json(result);
    }, function(err) {
        res.json({ message: 'Error loading parishes: ' + err })
    });
};

var get_month = function(req, res) {
    Month.findOne({
        where: {
            id: req.params.code
        }
    }).then(function(result) {
        res.json(result);
    }, function(err) {
        res.json({ message: 'Error loading months: ' + err })
    });
};

module.exports = {
    getSkills: get_all_skills,
    getSkillByCode: get_a_skill,
    addSkill: add_a_skill,
    editSkill: edit_a_skill,
    getAllParishes: get_all_parishes,
    getParishByCode: get_a_parish,
    getChurchContactTypes: get_church_contact_types,
    getPeopleContactTypes: get_people_contact_types,
    getContactTypes: get_contact_types,
    getContactType: get_contact_type,
    getMonths: get_all_months,
    getMonthByCode: get_month,
    getAllMaritalStatus: get_all_statuses,
    getMaritalStatusByCode: get_a_status
}