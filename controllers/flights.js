const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
  index,
  show,
  new: newFlight,
  create
};

  async function index(req, res) {
    const flights = await Flight.find({});
    res.render('flights/index', { title: 'All Flights', flights });
  }

  async function newFlight(req, res) {
    const flight = await Flight.findById(req.params.id);
    res.render('flights/new', { title: 'New Flight', flight });
}

async function show(req, res) {
  try {
      const flight = await Flight.findById(req.params.id);
      if (!flight) {
          return res.status(404).send('Flight not found');
      }

      const tickets = await Ticket.find({ flight: flight._id });

      res.render('flights/show', { title: 'Flight Details', flight, tickets });
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
}


async function create(req, res) {
  try {
    const { airline, airport, flightNo, departs } = req.body;
    const flight = new Flight({ airline, airport, flightNo, departs });
    await flight.save();
    res.redirect(`/flights/${flight._id}`);
  } catch (error) {
    console.error(error);
    res.render('flights/new', { title: 'Add Flight', errorMsg: error.message });
  }
}



