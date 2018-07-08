'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _factura = require('../api/controllers/factura.controller');

var _factura2 = _interopRequireDefault(_factura);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = exports.router = _express2.default.Router();

// Facturas
router.get('/facturas', _factura2.default.findAll);
router.get('/facturas/:id', _factura2.default.findOne);
router.delete('/facturas/:id', _factura2.default.delete);
router.put('/facturas/:id', _factura2.default.update);
router.post('/facturas', _factura2.default.create);
//# sourceMappingURL=routes.js.map