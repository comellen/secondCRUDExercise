require('dotenv').config();

const express = require('express');
const app = express();
const test = require('./controllers/testcontroller');
const user = require('./controllers/usercontroller');
const login = require('./controllers/logincontroller');
const logs = require('./controllers/logcontroller');
const sequelize = require('./db');
const bodyParser = require('body-parser');


sequelize.sync();
app.use(bodyParser.json());

app.use(require('./middleware/headers'));

//Exposed Routes
app.use('/test', test);
app.use('/api/user', user);
app.use('/api/login', login);

//Protected Routes
app.use(require('./middleware/validatesession'));
app.use('/api/log', logs);

app.listen(3000, function() {
    console.log('*** APP LISTENING ON 3000 ***')
});