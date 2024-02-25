const Flight = require('../models/flight');

module.exports = {
    addDestination
};

async function addDestination(req, res) {
    const flightId = req.params.id; 
    const { airport, arrival } = req.body;

    if (!isValidDate(arrival)) {
        return res.status(400).send('Invalid arrival date');
    }

    try {
        const flight = await Flight.findById(flightId);

        if (!flight) {
            return res.status(404).send('Flight not found');
        }

        flight.destinations.push({ airport, arrival });
        await flight.save();

        res.redirect(`/flights/${flightId}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}
function isValidDate(dateString) {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
}

