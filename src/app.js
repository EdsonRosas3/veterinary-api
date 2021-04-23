require('dotenv').config();
const express = require('express');

//const cors = require('cors');
const app =  express();
//app.use(cors());
app.set('port',process.env.PORT || 3500);

//Routes
app.use(express.json());

app.use('/api/auth',require('./routes/api/auth.routes'));
app.use('/api/informations',require('./routes/api/information.routes'));

module.exports = app;