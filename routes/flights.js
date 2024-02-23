const express = require('express');
const router = express.Router();
const Flight = require('../models/flight');
const flightsCtrl = require('../controllers/flights');

// GET -> /flights/new
router.get('/', flightsCtrl.index);
router.get('/new', flightsCtrl.new);
router.get('/:id', flightsCtrl.show);
router.post('/', flightsCtrl.create);
router.post('/:id/destinations', flightsCtrl.addDestination);

	
module.exports = router;
