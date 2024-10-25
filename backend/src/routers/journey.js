const express = require('express');
const Journey = require('../models/journey');
const Driver = require('../models/driver');
const Vehicle = require('../models/vehicle');
const Company = require('../models/company');
const mongoose = require('mongoose');
const router = new express.Router();
const auth = require('../middleware/auth');
const authRole = require('../middleware/authRole');


router.post('/api/journey', auth, authRole(['admin', 'driver']), async (req, res) => {
    const journey = new Journey(req.body);
    if(req.user.role === 'driver') {
        journey.driver = req.user._id;
    }
    try {
        await journey.save();

        await Driver.findByIdAndUpdate(
            journey.driver,
            { $push: { journeys: journey._id } },
            { new: true, runValidators: true }
        )

        await Vehicle.findByIdAndUpdate(
            journey.vehicle,
            { $push: { journeys: journey._id } },
            { new: true, runValidators: true }
        )

        await Company.findByIdAndUpdate(
            journey.company,
            { $push: { journeys: journey._id } },
            { new: true, runValidators: true }
        )

        res.status(201).send(journey);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/api/journey', auth, authRole(['admin', 'driver', 'companyUser']), async (req, res) => {
    try {
        if (req.user.role === 'driver') {
            try {
                const driver = await Driver.findOne({ user: req.user._id });
                if (!driver) {
                    return res.status(404).send();
                }
                const journeys = await Journey.find({ driver: driver._id });
                return res.send(journeys);
            } catch (e) {
                res.status(500).send();
            }
        } else if(req.user.role === 'companyUser') {
            try {
                const company = await Company.findOne({ user: req.user._id });
                if (!company) {
                    return res.status(404).send();
                }
                const journeys = await Journey.find({ company: company._id });
                return res.send(journeys);
            } catch (e) {
                res.status(500).send();
            }
        }
        const journeys = await Journey.find({});
        res.send(journeys);
    } catch (e) {
        res.status(500).send();
    }
});

router.get('/api/journey/:id', auth, authRole(['admin', 'driver', 'companyUser']), async (req, res) => {
    try {
        const _id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).send({ error: 'Invalid ID format' });
        }
        if(req.user.role === 'driver') {
            try {
                const driver = await Driver.findOne({ user: req.user._id });
                if (!driver) {
                    return res.status(404).send();
                }
                const journey = await Journey.findOne({ _id, driver: driver._id });
                if (!journey) {
                    return res.status(404).send();
                }
                return res.send(journey);
            } catch (e) {
                res.status(500).send();
            }
        } else if (req.user.role === 'companyUser') {
            try {
                const company = await Company.findOne({ user: req.user._id });
                if (!company) {
                    return res.status(404).send();
                }
                const journey = await Journey.findOne({ _id, company: company._id });
                if (!journey) {
                    return res.status(404).send();
                }
                return res.send(journey);
            } catch (e) {
                res.status(500).send();
            }
        }

        const journey = await Journey.findById(_id);
        if (!journey) {
            return res.status(404).send();
        }
        res.send(journey);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.patch('/api/journey/:id', auth, authRole(['admin', 'driver']), async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send({ error: 'Invalid ID format' });
    }
    const updates = Object.keys(req.body);
    const allowedUpdates = Object.keys(Journey.schema.paths).filter(path => path !== '__v' && path !== '_id');
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }
    if(req.user.role === 'driver') {
        try {
            const driver = await Driver.findOne({ user: req.user._id });
            if (!driver) {
                return res.status(404).send();
            }
            const journey = await Journey.findOne({ _id: req.params.id, driver: driver._id });
            if (!journey) {
                return res.status(404).send();
            }
        } catch (e) {
            res.status(500).send();
        }
    }

    try {
        const journey = await Journey.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!journey) {
            return res.status(404).send();
        }
        res.send(journey);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/api/journey/:id', auth, authRole(['admin']), async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).send({ error: 'Invalid ID format' });
        }

        const journey = await Journey.findByIdAndDelete(req.params.id);
        if (!journey) {
            return res.status(404).send();
        }
        res.send(journey);
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;