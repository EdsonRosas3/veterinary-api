require('dotenv').config();
const express = require('express');
const autRoute = require('./Routes/Api/authRoutes');
const infRoute = require('./Routes/Api/informationRoutes');
const userRouter = require('./Routes/Api/userRoutes');
const pdfView = require('./Routes/web/GenerateReport');
const app =  express();
const path = require('path')

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
//Configuration app
app.set('port',process.env.PORT || 3500);
app.use(express.json());

//Routes
app.use('/pdf/report',pdfView);
app.use('/api/auth',autRoute);
app.use('/api/informations',infRoute);
app.use('/api/user',userRouter);

module.exports = app;