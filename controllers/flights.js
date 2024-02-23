const Flight = require('../models/flight');

module.exports = {
    new: newFlight,
    create,
    index
  };

  async function index(req, res) {
    const flights = await Flight.find({});
    res.render('flights/index', { title: 'All Flights', flights });
  }

  function newFlight(req, res) {
    res.render('flights/new', { errorMsg: ''});
  }


  async function create(req, res) {
    try {
      const { airline, airport, flightNo, departs } = req.body;
      const flight = new Flight({ airline, airport, flightNo, departs });
      await flight.save();
      res.redirect(`/flights/${flight._id}`);
    } catch (err) {
      console.error(err);
      res.render('flights/new', { title: 'Add Flight', errorMsg: err.message });
    }
  }

  