const express = require('express');
const Vehicle = require('../models/vehicle');
const Company = require('../models/company');
const mongoose = require('mongoose');
const axios = require('axios');
const router = new express.Router();
const auth = require('../middleware/auth');
const authRole = require('../middleware/authRole');


router.post('/api/vehicle', auth, authRole(['admin']), async (req, res) => {
    const vehicle = new Vehicle(req.body);

    try {
        await vehicle.save();

        await Company.findByIdAndUpdate(
            vehicle.owner,
            { $push: { vehicles: vehicle._id } },
            { new: true, runValidators: true }
        )

        res.status(201).send(vehicle);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/api/vehicle', auth, authRole(['admin']), async (req, res) => {
    try {
        const vehicles = await Vehicle.find({});
        res.send(vehicles);
    } catch (e) {
        res.status(500).send();
    }
});

router.get('/api/vehicle/:id', auth, authRole(['admin']), async (req, res) => {
    const _id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).send({ error: 'Invalid ID format' });
        }

        const vehicle = await Vehicle.findById(_id);
        if (!vehicle) {
            return res.status(404).send();
        }
        res.send(vehicle);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.patch('/api/vehicle/:id', auth, authRole(['admin']), async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send({ error: 'Invalid ID format' });
    }
    const allowedUpdates = Object.keys(Vehicle.schema.paths).filter(path => path !== '__v' && path !== '_id');
    const isValidOperation = Object.keys(req.body).every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!vehicle) {
            return res.status(404).send();
        }

        res.send(vehicle);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/api/vehicle/:id', auth, authRole(['admin']), async (req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
        if (!vehicle) {
            return res.status(404).send();
        }
        res.send(vehicle);
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;
