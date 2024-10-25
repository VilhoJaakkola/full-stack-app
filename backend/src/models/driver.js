const mongoose = require('mongoose');
const validator = require('validator');

const driverSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isMobilePhone(value, "fi-FI")) {
                throw new Error('Phone number is invalid');
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    cardClass: {
        type: String,
        required: true,
        trim: true
    },
    cardClassEndDate: {
        type: Date,
        required: true,
        trim: true
    },
    professionalQualificationsStartDate: {
        type: Date,
        required: true,
        trim: true
    },
    professionalQualificationsEndDate: {
        type: Date,
        required: true,
        trim: true
    },
    journeys: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Journey'
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Viittaus User-malliin
        required: true  // Käyttäjä on pakollinen
    }
}, {
    timestamps: true
});

const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;
