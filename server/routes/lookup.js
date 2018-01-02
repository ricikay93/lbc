const express = require('express');
const router = express.Router();

let lookUpController = require('../controllers/lookup_controller');

router.route('/skills')
    .get(lookUpController.getSkills)
    .post(lookUpController.addSkill);

router.route('/skills/:id')
    .get(lookUpController.getSkillByCode)
    .put(lookUpController.editSkill);

// parishes
router.route('/parishes')
    .get(lookUpController.getAllParishes);

router.route('/parishes/:code')
    .get(lookUpController.getParishByCode);

// // marital status
// router.route('/marital_statuses')
//     .get(lookUpController.getAllMaritalStatus);

// router.route('/marital_statuses/:code')
//     .get(lookUpController.getMaritalStatusByCode);

// // contacts
// router.route('/contactTypes')
//     .get(lookUpController.getContactTypes);

// router.route('/contactTypes/church')
//     .get(lookUpController.getChurchContactTypes);

// router.route('/contactTypes/people')
//     .get(lookUpController.getPeopleContactTypes);

// router.route('/contactTypes/:code')
//     .get(lookUpController.getContactType);

// // months
// router.route('/months')
//     .get(lookUpController.getMonths);

// router.route('/months/:code')
//     .get(lookUpController.getMonth);


module.exports = router;