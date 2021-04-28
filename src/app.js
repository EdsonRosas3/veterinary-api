require('dotenv').config();
const express = require('express');
const autRoute = require('./Routes/Api/authRoutes');
const infRoute = require('./Routes/Api/informationRoutes');
const app =  express();


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.set('port',process.env.PORT || 3500);

//Routes
app.use(express.json());

app.use('/api/auth',autRoute);
app.use('/api/informations',infRoute);

module.exports = app;