const router = require('express').Router();
const Log = require('../db').import('../model/log');
const validateSession = require('../middleware/validatesession');

router.get('/', (req, res) => {
    Log.findAll()
        .then(log => res.status(200).json(log))
        .catch(err => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
    Log.findOne({ where: { id: req.params.id } })
        .then(log => res.status(200).json(log))
        .catch(err => res.status(500).json(err));
});

router.post('/', validateSession, (req, res) => {
    if (!req.errors) {
        const logFromRequest = {
            description: req.body.description,
            definition: req.body.definition,
            result: req.body.result,
            owner: req.body.owner
        };

        Log.create(logFromRequest)
            .then(log => res.status(200).json(log))
            .catch(err => res.json(req.errors));
    } else {
        res.status(500).json(req.errors)
    };
});

router.put('/:id', (req, res) => {
    if (!req.errors) {
        Log.update(req.body, { where: { id: req.params.id } })
            .then(log => res.status(200).json(log))
            .catch(err => res.json(req.errors));
    } else {
        res.status(500).json(req.errors);
    };
});

router.delete('/:id', (req, res) => {
    if (!req.errors) {
        Log.destroy({ where: { id: req.params.id } })
            .then(log => res.status(200).json(log))
            .catch(err => res.json(req.errors));
    } else {
        res.status(500).json(req.errors);
    };
});

module.exports = router;