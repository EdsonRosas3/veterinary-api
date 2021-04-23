require('dotenv').config();
const express = require('express');
const autRoute = require('./Routes/Api/authRoutes');
const infRoute = require('./Routes/Api/informationRoutes');

//const cors = require('cors');
const app =  express();
//app.use(cors());
app.set('port',process.env.PORT || 3500);

//Routes
app.use(express.json());

app.use('/api/auth',autRoute);
app.use('/api/informations',infRoute);

module.exports = app;