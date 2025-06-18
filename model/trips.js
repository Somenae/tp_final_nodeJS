const mongoose = require('mongoose');
const DateOnly = require('mongoose-dateonly')(mongoose);

const tripsSchema = new mongoose.Schema({
  departureDateTime: {
      type: DateOnly,
      required: true
  },
  arrivalDateTime: {
      type: DateOnly,
      required: true
  },
  departure: {
    type: String,
    required: true
  },
  destination: {
      type: String,
      required: true
  },
  price: {
      type: Number,
      required: true
  },
  status: {
      type: String,
      enum: ['available', 'booked', 'canceled'],
      default: 'available'
  },
  places: {
      type: Number,
      required: true
  },
  requiredDocuments: [{
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String
    }
  }],
  createdAt: {
      type: Date,
      default: Date.now
  }
});

// Export du modèle
module.exports = mongoose.model('Trips', tripsSchema);