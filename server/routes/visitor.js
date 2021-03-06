const express = require('express');
const router = express.Router();

let visitorController = require('../controllers/visitor_controller');

// churches
router.route('/parents')
    .get(visitorController.getParentNodes);

router.route('/parents/visitors/:letter')
    .get(visitorController.getVisitorsByLetter);

router.route('/inviter/:lookup')
    .get(visitorController.getInviteesAutoComplete);

router.route('/')
    .get(visitorController.getAllVisitors)
    .post(visitorController.addVisitor);

router.route('/:code')
    .get(visitorController.getVisitorByCode)
    .put(visitorController.updateVisitor)
    .delete(visitorController.deleteVisitor);

router.route('/:church')
    .get(visitorController.getChurchVisitors);

module.exports = router;