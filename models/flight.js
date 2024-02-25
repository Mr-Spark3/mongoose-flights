const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const destinationSchema = new Schema({
  airport: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
    default: 'n/a',
  },
  arrival: {
    type: Date,
    default: () => {
      const date = new Date();
      date.setDate(date.getDate() + 1);
      return date;
    }
  }
}, {
  timestamps: true
});

const flightSchema = new Schema({
  airline: {
    type: String,
    enum: ['Spirit', 'Southwest', 'United', 'Delta', 'Frontier'],
    required: true
  },
  airport: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
    default: 'DEN'
  },
  flightNo: {
    type: Number,
    required: true,
    min: 10,
    max: 9999
  },
  departs: {
    type: Date,
    default: () => {
      const date = new Date();
      date.setFullYear(date.getFullYear() + 1);
      return date;
    }
  },
  destinations: [{
    airport: String,
    arrival: Date
  }]
});

module.exports = mongoose.model('Flight', flightSchema);



  