let express = require('express');
let router = express.Router();

router.get('/', function(req, res) {
    res.send('This is a test route, gg.')
});

router.get('/about', function(req, res) {
    res.send('This app is an exercise in server building. This is the mini-project exercise from chapter 12 of the Node Server Gitbook.')
});

module.exports = router;