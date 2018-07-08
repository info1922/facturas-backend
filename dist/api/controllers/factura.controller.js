'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _factura = require('../models/factura.model');

var _factura2 = _interopRequireDefault(_factura);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Todas las operaciones de facturas
exports.default = {
    // Obtiene todas las facturas
    findAll: function findAll(req, res) {
        _factura2.default.find().then(function (facturas) {
            _factura2.default.count(function (err, totalRegistros) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al consultar registros'
                    });
                }
                return res.status(200).json({
                    ok: true,
                    totalRegistros: totalRegistros,
                    facturas: facturas
                });
            });
        }).catch(function (err) {
            return res.status(500).json({ ok: false, mensaje: err });
        });
    },


    // Crea una nueva factura
    create: function create(req, res) {
        // let { item, qty, date, due, rate, tax } = req.body;

        var schema = _joi2.default.object().keys({
            item: _joi2.default.string().required().error(new Error()),
            qty: _joi2.default.number().integer().required().error(new Error()),
            date: _joi2.default.date().required().error(new Error()),
            due: _joi2.default.date().required().error(new Error()),
            rate: _joi2.default.number().optional(),
            tax: _joi2.default.number().optional()
        });

        var _Joi$validate = _joi2.default.validate(req.body, schema),
            error = _Joi$validate.error,
            value = _Joi$validate.value;

        if (error && error.details) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al insertar datos',
                error: error
            });
        }

        _factura2.default.create(value).then(function (factura) {
            return res.status(200).json({
                ok: true,
                mensaje: "Datos guardados",
                factura: factura
            });
        }).catch(function (err) {
            return res.status(500).json(err);
        });
    },


    // Busca una factura por su id
    findOne: function findOne(req, res) {
        var id = req.params.id;


        _factura2.default.findById(id).then(function (factura) {
            if (!factura) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Erro al buscar la factura'
                });
            }
            return res.status(200).json({
                ok: true,
                factura: factura
            });
        }).catch(function (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Este id no existe',
                error: err
            });
        });
    },


    // Elimina una factura por su id
    delete: function _delete(req, res) {
        var id = req.params.id;


        _factura2.default.findByIdAndRemove(id).then(function (facturaDelete) {
            if (!facturaDelete) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al eliminar esta factura',
                    facturaDelete: facturaDelete
                });
            }
            return res.status(200).json({
                ok: true,
                mensaje: 'Factura eliminada',
                facturaDelete: facturaDelete
            });
        }).catch(function (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Este id no existe',
                error: err
            });
        });
    },


    // Actualiza una factura por su id
    update: function update(req, res) {
        var id = req.params.id;


        var schema = _joi2.default.object().keys({
            item: _joi2.default.string().optional(),
            qty: _joi2.default.number().integer().optional(),
            date: _joi2.default.date().optional(),
            due: _joi2.default.date().optional(),
            rate: _joi2.default.number().optional(),
            tax: _joi2.default.number().optional()
        });

        var _Joi$validate2 = _joi2.default.validate(req.body, schema),
            error = _Joi$validate2.error,
            value = _Joi$validate2.value;

        if (error && error.details) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al insertar datos',
                error: error
            });
        }

        _factura2.default.findOneAndUpdate({ _id: id }, value, { new: true }).then(function (facturaUpdate) {
            // if (!usuario) {
            //     return res.status(400).json({
            //         ok: false,
            //         mensaje: 'El usuario con id ' + id + ' no existe',
            //         errors: { message: 'No existe un usuario con ese ID' }
            //     });
            // }
            return res.status(200).json({
                ok: true,
                mensaje: "Factura actualizada",
                facturaUpdate: facturaUpdate
            });
        }).catch(function (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al actualiza factura el id no existe',
                err: err
            });
        });
    }
};
//# sourceMappingURL=factura.controller.js.map