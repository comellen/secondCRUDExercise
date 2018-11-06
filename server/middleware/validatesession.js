const jwt = require('jsonwebtoken');
const sequelize = require('../db');
const User = sequelize.import('../model/user');

module.exports = (req, res, next) => {
    if (req.method == 'OPTIONS') {
        next();
    } else {
        let sessionToken = req.headers.authorization;
        if (!sessionToken) return next();
        else {
            jwt.verify(sessionToken, process.env.JWT_SECRET, (err, decoded) => {
                if (decoded) {
                    User.findOne({ where: { id: decoded.id } })
                        .then(user => {
                            req.user = user;
                            next();
                        },
                            () => {
                                res.status(401).send({ error: 'Not authorized.' });
                            });
                } else {
                    res.status(400).send({ error: 'Not authorized' });
                }
            });
        }
    }
}