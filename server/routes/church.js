const express = require('express');
const router = express.Router();

let churchController = require('../controllers/church_controller');

// churches
router.route('/')
    .get(churchController.getChuches)
    .post(churchController.addChurch);

router.route('/:code')
    .get(churchController.getChurchByCode)
    .put(churchController.updateChurch)
    .delete(churchController.deleteChurch);

// // contacts
// router.route('/:code/contacts')
//     .get(churchController.getChurchContacts)
//     .post(churchController.addContact);

// router.route('/:code/contacts/:id')
//     .get(churchController.getChurchContactByCode)
//     .put(churchController.updateContact)
//     .delete(churchController.deleteContact);

// //missions
// router.route('/:code/misssions')
//     .get(churchController.getChurchMissions)
//     .post(churchController.addMission);


// router.route('/:code/missions/:id')
//     .get(churchController.getChurchMissionByCode)
//     .put(churchController.updateMission)
//     .delete(churchController.deleteMission);


module.exports = router;