const express = require('express');
const router = express.Router();

let visitorController = require('../controllers/visitor_controller');

// churches
router.route('/')
    .get(visitorController.getAllVisitors)
    .post(visitorController.addChurch);

router.route('/:code')
    .get(visitorController.getVisitorByCode)
    .put(visitorController.updateVisitor)
    .delete(visitorController.deleteVisitor);

router.route('/:church')
    .get(visitorController.getChurchVisitors)