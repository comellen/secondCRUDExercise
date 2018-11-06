const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const User = sequelize.import('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/createuser', (req, res) => {
    let username = req.body.user.username;
    let password = req.body.user.password;
    console.log("you reached it");

    User.create({
        username: username,
        passwordhash: bcrypt.hashSync(password, 10)
    })
        .then(
            function createSuccess(user) {
                let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
                res.json({
                    user: user,
                    message: 'created',
                    sessionToken: token
                });
            },
            function createError(err) {
                res.send(500, err.message);
            }
        );
});

module.exports = router;