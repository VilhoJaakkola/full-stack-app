const express = require('express');
const Driver = require('../models/driver');
const { default: mongoose } = require('mongoose');
const router = new express.Router();
const auth = require('../middleware/auth');
const authRole = require('../middleware/authRole');

router.post('/api/driver', auth, authRole(['admin']), async (req, res) => {
    const driver = new Driver(req.body);

    try {
        await driver.save();
        res.status(201).send(driver);
    } catch (e) {
        res.status(400).send(e);
    }
})


router.get('/api/driver', auth, authRole(['admin']), async (req, res) => {
    try {
        const drivers = await Driver.find({});
        res.send(drivers);
    } catch (e) {
        res.status(500).send();
    }
});

router.get('/api/driver/:id', auth, authRole(['admin']), async (req, res) => {
    const _id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).send({ error: 'Invalid ID format' });
        }

        const driver = await Driver.findById(_id);
        if (!driver) {
            return res.status(404).send();
        }
        res.send(driver);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.patch('/api/driver/:id', auth, authRole(['admin']), async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send({ error: 'Invalid ID format' });
    }
    const allowedUpdates = Object.keys(Driver.schema.paths).filter(path => path !== '__v' && path !== '_id' && path !== 'createdAt' && path !== 'updatedAt' && path !== 'user' );
    const isValidOperation = Object.keys(req.body).every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const driver = await Driver.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!driver) {
            return res.status(404).send();
        }

        res.send(driver);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/api/driver/:id', auth, authRole(['admin']), async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).send({ error: 'Invalid ID format' });
        }
        const driver = await Driver.findByIdAndDelete(req.params.id);

        if (!driver) {
            return res.status(404).send();
        }

        res.send(driver);
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;
