const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const User = sequelize.import('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {
    User
        .findOne({
            where: {
                username: req.body.user.username
            }
        })
        .then(
            (user) => {
                if (user) {
                    bcrypt.compare(req.body.user.password, user.passwordhash, (err, matches) => {
                        if (matches) {
                            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
                            res.json({
                                user: user,
                                message: 'Authentication successful.',
                                sessionToken: token
                            })
                        } else {
                            res.status(502).send({ error: 'Failure' });
                        }
                    });
                } else {
                    res.status(500).send({ error: 'Failed to authenticate.' });
                }
            },
            (err) => {
                res.status(501).send({ error: 'Failure' });
            }
        );
});

module.exports = router;