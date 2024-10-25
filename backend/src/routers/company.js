const express = require('express');
const Company = require('../models/company');
const mongoose = require('mongoose');
const router = new express.Router();
const auth = require('../middleware/auth');
const authRole = require('../middleware/authRole');

router.post('/api/company', auth, authRole(['admin']), async (req, res) => {
    const company = new Company(req.body);

    try {
        await company.save();
        res.status(201).send(company);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/api/company', auth, authRole(['admin', 'driver']), async (req, res) => {
    try {
        const companies = await Company.find({});
        res.send(companies);
    } catch (e) {
        res.status(500).send();
    }
});

router.get('/api/company/:id', auth, authRole(['admin', 'companyUser']), async (req, res) => {
    const _id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).send({ error: 'Invalid ID format' });
        }
        if(req.user.role === 'companyUser' && req.user.company.toString() !== _id) {
            return res.status(403).send({ error: 'Forbidden' });
        }

        const company = await Company.findById(_id);
        if (!company) {
            return res.status(404).send();
        }
        res.send(company);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.patch('/api/company/:id', auth, authRole(['admin']), async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send({ error: 'Invalid ID format' });
    }
    const allowedUpdates = [
        ...Object.keys(Company.schema.paths).filter(path => path !== '__v' && path !== '_id'),
        'contact.name',
        'contact.email',
        'contact.phoneNumber',
        'address.street',
        'address.postalCode',
        'address.city'
    ];
    const isValidOperation = Object.keys(req.body).every(update => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }
    try {
        const company = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!company) {
            return res.status(404).send();
        }
        res.send(company);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/api/company/:id', auth, authRole(['admin']), async (req, res) => {
    try {
        const company = await Company.findByIdAndDelete(req.params.id);
        if (!company) {
            return res.status(404).send();
        }
        res.send(company);
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;
