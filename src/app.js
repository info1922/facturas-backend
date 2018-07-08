import express from 'express';
import mongoose from "mongoose";
const colors = require('colors');
var bodyParser = require('body-parser');
import { router } from './config/routes';

// Config
require('./config/config');

mongoose.connection.openUri(process.env.URLDB, { useNewUrlParser: true }, (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log('DB: '.yellow, 'OK'.green);
    }
});


const app = express();


// Body Parser configuración
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


const PORT = 3000;

app.use('/api', router);

app.get('/', (req, res) => {
    res.status(200).json({
        ok: true,
        mensaje: 'Todo bien'
    });
});


// Escuchar peticiones
app.listen(process.env.PORT || 3000, () => {
    console.log("                                       ");
    console.log("---------------------------------".white);
    console.log('Express 3000:'.yellow, 'OK'.bold.green);
});