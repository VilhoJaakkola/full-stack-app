const mongoose = require('mongoose');
const validator = require('validator');

const companySchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
        trim: true
    },
    companyCode: {
        type: String,
        required: true,
        trim: true
    },
    isOwnCompany: {
        type: Boolean,
        default: false      // merkitsee onko yritys oma yritys vai ei
    },
    contact: {
        name: {
            type: String,
            required: true,
            trim: true
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
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Email is invalid');
                }
            }
        }
    },
    address: {
        street: {
            type: String,
            required: true,
            trim: true
        },
        postalCode: {
            type: String,
            required: true,
            trim: true,
            validate(value) {
                const pattern = /^[0-9]{5}$/;
                if (!pattern.test(value)) {
                    throw new Error('Postal code must contain 5 digits');
                }
            }
        },
        city: {
            type: String,
            required: true,
            trim: true
        }
    },
    vehicles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle'  // viittaus ajoneuvomalliin
    }],
    journeys: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Journey'  // viittaus kuljetusmalliin
    }],
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'  // viittaus käyttäjämalliin
    }]
}, {
    timestamps: true
});


const Company = mongoose.model('Company', companySchema);

module.exports = Company;