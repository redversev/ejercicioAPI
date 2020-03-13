const express = require('express');
const bodyParser = require('body-parser')
const routes = require('./routes/userRoutes');
const app = express();

app.use(bodyParser.json()); //Analiza datos que se pasan por el url.

app.use('/api', routes);

module.exports = app;