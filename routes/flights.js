const express = require('express');
const router = express.Router();
const flightsCtrl = require('../controllers/flights');

// GET -> /flights/new
router.get('/new', flightsCtrl.new);
router.get('/', flightsCtrl.index);
router.post('/', flightsCtrl.create);
	
module.exports = router;
