import express from 'express';
import mongoose from "mongoose";
const colors = require('colors');
var bodyParser = require('body-parser');

require('./config/config');
const app = express();


// API - Docs
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './config/swagger.json';

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    explorer: true
}));

// Body Parser configuración
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

import { router } from './config/routes';

// Config

mongoose.connection.openUri(process.env.URLDB, { useNewUrlParser: true }, (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log('DB: '.yellow, 'OK'.green);
    }
});


app.use('/api', router);

app.get('/', (req, res) => {
    res.status(200).json({
        ok: true,
        mensaje: 'Todo mejor'
    });
});


// Escuchar peticiones
app.listen(process.env.PORT || 3000, () => {
    console.log("                                       ");
    console.log("---------------------------------".white);
    console.log('Express 3000:'.yellow, 'OK'.bold.green);
});