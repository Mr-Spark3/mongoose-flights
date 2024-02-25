const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    new: newTicket,
    create,
    delete: deleteTicket,
};

async function newTicket(req, res) {
    const flightId = req.params.id;
    const tickets = await Ticket.find({}).sort('name');
    res.render('flights/new', { title: 'New Flight', flight: { _id: flightId }, tickets });
}

async function create(req, res) {
    req.body.born += 'T00:00';
    try {
        await Ticket.create(req.body);
    } catch (err) {
        console.log(err);
    }
    res.redirect(`/flights/${req.params.id}`);
}

async function deleteTicket(req, res) {
    try {
        await Ticket.findByIdAndDelete(req.params.id);
        res.redirect('/tickets');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}
