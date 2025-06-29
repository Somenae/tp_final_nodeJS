const mongoose = require('mongoose');

const registrationsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    travel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trips'
    },
    document: [{
        title: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    }],
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    }
});

module.exports = mongoose.model('Registrations', registrationsSchema);