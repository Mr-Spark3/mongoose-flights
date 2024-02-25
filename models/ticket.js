const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const ticketSchema = new Schema({
    seat: {
      type: String,
      required: true,
      match: /^[A-F]\d{1,2}$/, 
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    flight: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Flight',
      required: true,
    },
  });
  
  const Ticket = mongoose.model('Ticket', ticketSchema);
  
  module.exports = Ticket;