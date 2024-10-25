const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    licensePlate: {
        type: String,
        required: [true, 'License plate is required'],
        trim: true,
        unique: true,
        validate(value) {
            const pattern = /^[A-Z0-9-]+$/;
            if (!pattern.test(value)) {
                throw new Error('License plate must contain only uppercase letters, numbers, and hyphens');
            }
        }
    },
    vehicleClass: {
        type: String,
        required: [true, 'Vehicle class is required'],
        trim: true
    },
    textField: {
        type: String,
        trim: true,
        default: ''
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    journeys: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Journey'
    }]
}, {
    timestamps: true
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
