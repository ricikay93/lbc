var Sequelize = require('sequelize');
const Op = Sequelize.Op;


let member = require('../models/member');
let Member = member.Member;
let Schooling = member.Schooling;
let MemberContact = member.MemberContact;
let MemberSkill = member.MemberSkill;

let church = require('../models/church');
let Church = church.Church

let lookUp = require('../models/lookUp');
let Parish = lookUp.Parish;
let ContactType = lookUp.ContactType;
let Month = lookUp.Month;
let Profession = lookUp.Profession;
let Skill = lookUp.Skill;

var add_member = function(req, res) {};

var edit_member = function(req, res) {};

var delete_member = function(req, res) {};

var get_member = function(req, res) {}

var get_church_members = function(req, res) {};

// member schooling
var add_member_schooling = function(req, res) {};

var edit_member_schooling = function(req, res) {};

var get_all_member_schooling = function(req, res) {};

// var get_all_schooling = function(req, res) {};

var delete_member_schooling = function(req, res) {};

// member contact
var get_member_contacts = function(req, res) {};

var add_member_contact = function(req, res) {};

var edit_member_contact = function(req, res) {};

var delete_member_contact = function(req, res) {};

var get_all_members_contacts = function(req, res) {};

//member skil