var Sequelize = require('sequelize');
const Op = Sequelize.Op;


let circuit = require('../models/circuit');
let church = require('../models/church');
let Circuit = circuit.Circuit;
let Church = church.Church;
let ChurchContact = church.ChurchContact;
let ChurchMission = church.ChurchMission;

// churches
var get_churches = function(req, res) {
    Church.findAll().then(function(result) {
        res.json(result);
    }, function(err) {
        res.json({ message: 'Error loading churches: ' + err })
    });
};

var get_church = function(req, res) {
    Church.find({
        where: {
            id: req.param.codes
        }
    }).then(function(result) {
        res.json(result);
    }, function(err) {
        res.json({ message: 'Error loading church: ' + err })
    });
};

var add_church = function(req, res) {
    Church.create(req.body).then(function(result) {
        res.json({ message: 'Church saved successfully' });
    }, function(err) {
        res.json({ message: 'Error saving church: ' + err })
    });
};

var update_church = function(req, res) {
    Church.update(req.body, {
        where: {
            id: req.params.code
        }
    }).then(function(result) {
        res.json(result);
    }, function(err) {
        res.json({ message: 'Error updating church: ' + err })
    });
};

var delete_church = function(req, res) {
    Church.destroy({
        where: {
            id: req.params.code
        }
    }).then(function(result) {
        res.json({ message: 'Church deleted successfully: ' + err });
    }, function(err) {
        res.json({ message: 'Error updating church: ' + err })
    });
};

// contacts

var get_all_contacts = function(req, res) {
    ChurchContact.findAll().then(function(result) {
        res.json(result);
    }, function(err) {
        res.json({ message: 'Error loading contacts: ' + err })
    });
};

var get_church_contacts = function(req, res) {
    ChurchContact.find({
        where: {
            church_id: req.params.church
        }
    }).then(function(result) {
        res.json(result);
    }, function(err) {
        res.json({ message: 'Error loading contacts: ' + err })
    });
};

var get_contact = function(req, res) {
    ChurchContact.find({
        where: {
            id: req.params.code
        }
    }).then(function(result) {
        res.json(result);
    }, function(err) {
        res.json({ message: 'Error loading contact: ' + err })
    });
};

var add_contact = function(req, res) {
    ChurchContact.create(req.body).then(function(result) {
        res.json({ message: 'Church Contact saved successfully' });
    }, function(err) {
        res.json({ message: 'Error saving church contact: ' + err })
    });
}


var update_contacts = function(req, res) {
    ChurchContact.update(req.body, {
        where: {
            id: req.params.code,
            church_id: req.params.church
        }
    }).then(function(result) {
        res.json({ message: 'Church Contact updated successfully' });
    }, function(err) {
        res.json({ message: 'Error updated church contact: ' + err })
    });
};

var delete_contacts = function(req, res) {
    ChurchContact.destroy(req.body, {
        where: {
            id: req.params.code,
            church_id: req.params.church
        }
    }).then(function(result) {
        res.json({ message: 'Church Contact deleted successfully' });
    }, function(err) {
        res.json({ message: 'Error deleting church contact: ' + err })
    });
};

//missions
var add_mission = function(req, res) {
    ChurchMission.create(req.body).then(function(result) {
        res.json({ message: 'Church Mission saved successfully' });
    }, function(err) {
        res.json({ message: 'Error saving church mission: ' + err })
    });

};

var get_mission = function(req, res) {
    ChurchMission.find({
        where: {
            id: req.params.code
        }
    }).then(function(result) {
        res.json(result);
    }, function(err) {
        res.json({ message: 'Error finding church mission with id ' + id + ': ' + err })
    });
};

var get_missions = function(req, res) {
    ChurchMission.findAll().then(function(result) {
        res.json(result);
    }, function(err) {
        res.json({ message: 'Error finding church missions: ' + err })
    });
};

var get_church_missions = function(req, res) {
    ChurchMission.find({
        where: {
            church_id: req.params.church
        }
    }).then(function(result) {
        res.json(result);
    }, function(err) {
        res.json({ message: 'Error finding church missions: ' + err })
    });
};

var update_missions = function(req, res) {
    ChurchMission.update(req.body, {
        where: {
            id: req.params.code,
            church_id: req.params.church
        }
    }).then(function(result) {
        res.json({ message: 'Church Mission updated successfully' });
    }, function(err) {
        res.json({ message: 'Error saving church mission: ' + err })
    });
};

var delete_missions = function(req, res) {
    ChurchMission.destroy({
        where: {
            id: req.params.code
        }
    }).then(function(result) {
        res.json({ message: 'Church Mission deleted successfully' });
    }, function(err) {
        res.json({ message: 'Error deleting church mission: ' + err })
    });
};

module.exports = {
    getChuches: get_churches,
    getChurchByCode: get_church,
    addChurch: add_church,
    updateChurch: update_church,

    getChurchContactsByChurch: get_church_contacts,
    getChurchContactByCode: get_contact,
    getChurchContacts: get_all_contacts,
    updateContacts: update_contacts,
    deleteContacts: delete_contacts,

    getChurchMissionsByChurch: get_church_missions,
    getChurchMissionByCode: get_mission,
    getChurchMissions: get_missions,
    updateMission: update_missions,
    deleteMission: delete_missions
};