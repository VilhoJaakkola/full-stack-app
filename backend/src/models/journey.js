const mongoose = require('mongoose');

const journeySchema = new mongoose.Schema({
    routeNro: {
        type: String,
        required: true,
        trim: true
    },
    startDate: {
        type: Date,
        required: true  // Aloitusaika
    },
    endDate: {
        type: Date,      // ei required, koska ajo voi olla kesken
        default: null
    },
    totalTime: {
        type: Number,   // Ajoaika minuutteina, ei required, koska ajo voi olla kesken
        default: 0
    },
    startKilometers: {
        type: Number,
        required: true  // Kilometrit alussa
    },
    endKilometers: {
        type: Number,    // ei required, koska ajo voi olla kesken
        default: null
    },
    isCompleted: {
        type: Boolean,
        default: false  // Onko ajo päättynyt (boolean)
    },
    details: {
        type: String,
        trim: true,
        default: ''  // Lisätiedot-tekstikenttä
    },
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true  // Linkki ajoneuvoon
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
        required: true  // Linkki kuljettajaan
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true  // Linkki yritykseen
    }
}, {
    timestamps: true
});

const Journey = mongoose.model('Journey', journeySchema);

module.exports = Journey;
