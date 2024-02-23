const Flight = require('../models/flight');

module.exports = {
    new: newFlight,
    create,
    index,
    show, 
    addDestination

  };

  async function index(req, res) {
    const flights = await Flight.find({});
    res.render('flights/index', { title: 'All Flights', flights });
  }

  function newFlight(req, res) {
    res.render('flights/new', { errorMsg: ''});
  }

  async function show(req, res) {
    try {
        const flight = await Flight.findById(req.params.id);
        if (!flight) {
            return res.status(404).send('Flight not found');
        }
        res.render('flights/show', { title: 'Flight Details', flight });
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
      res.render('flights/new', { title: 'Add Flight', errorMsg: err.message });
    }
  }


  async function addDestination(req, res) {
    const flightId = req.params.id;
    const destination = req.body.airport;

    try {
        const flight = await Flight.findById(flightId);

        if (!flight) {
            return res.status(404).send('Flight not found');
        }

        flight.destinations.push(destination);
        await flight.save();

        res.redirect(`/flights/${flightId}`);
    } catch (error) {
        console.error(error);
    }
}
