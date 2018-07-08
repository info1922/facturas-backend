'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _routes = require('./config/routes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var colors = require('colors');
var bodyParser = require('body-parser');


// Config
require('./config/config');

_mongoose2.default.connection.openUri(process.env.URLDB, { useNewUrlParser: true }, function (err, res) {
    if (err) {
        throw err;
    } else {
        console.log('DB: '.yellow, 'OK'.green);
    }
});

var app = (0, _express2.default)();

// Body Parser configuración
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

var PORT = 3000;

app.use('/api', _routes.router);

app.get('/', function (req, res) {
    res.status(200).json({
        ok: true,
        mensaje: 'Todo bien'
    });
});

// Escuchar peticiones
app.listen(process.env.PORT || 3000, function () {
    console.log("                                       ");
    console.log("---------------------------------".white);
    console.log('Express 3000:'.yellow, 'OK'.bold.green);
});
//# sourceMappingURL=app.js.map