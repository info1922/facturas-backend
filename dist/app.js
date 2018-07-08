'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var colors = require('colors');
var app = (0, _express2.default)();

var PORT = 3000;

app.get('/', function (req, res) {
    res.status(200).json({
        ok: true,
        mensaje: 'Todo bien'
    });
});

app.listen(PORT, function () {
    console.log(('Servidor corriendo en PORT: ' + PORT).rainbow);
});
//# sourceMappingURL=app.js.map