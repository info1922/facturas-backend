import Joi from 'joi';
import Factura from '../models/factura.model';




// Todas las operaciones de facturas
export default {
    // Obtiene todas las facturas
    findAll(req, res) {
        Factura.find().then(facturas => {
                Factura.count((err, totalRegistros) => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            mensaje: 'Error al consultar registros'
                        });
                    }
                    return res.status(200).json({
                        ok: true,
                        totalRegistros,
                        facturas
                    });
                });
            })
            .catch(err => res.status(500).json({ ok: false, mensaje: err }));
    },

    // Crea una nueva factura
    create(req, res) {
        // let { item, qty, date, due, rate, tax } = req.body;

        const schema = Joi.object().keys({
            item: Joi.string().required().error(new Error()),
            qty: Joi.number().integer().required().error(new Error()),
            date: Joi.date().required().error(new Error()),
            due: Joi.date().required().error(new Error()),
            rate: Joi.number().optional(),
            tax: Joi.number().optional()
        });

        const { error, value } = Joi.validate(req.body, schema);

        if (error && error.details) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al insertar datos',
                error
            });
        }

        Factura.create(value)
            .then(factura => {
                return res.status(200).json({
                    ok: true,
                    mensaje: "Datos guardados",
                    factura
                });
            })
            .catch(err => { return res.status(400).json(err); });
    },

    // Busca una factura por su id
    findOne(req, res) {
        let { id } = req.params;

        Factura.findById(id)
            .then(factura => {
                if (!factura) {
                    return res.status(404).json({
                        ok: false,
                        mensaje: 'Este id no existe'
                    });
                }
                return res.status(200).json({
                    ok: true,
                    factura
                });

            })
            .catch(err => {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Este id no existe',
                    error: err
                });
            });

    },

    // Elimina una factura por su id
    delete(req, res) {
        let { id } = req.params;

        Factura.findByIdAndRemove(id)
            .then(facturaDelete => {
                if (!facturaDelete) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al eliminar esta factura',
                        facturaDelete
                    });
                }
                return res.status(200).json({
                    ok: true,
                    mensaje: 'Factura eliminada',
                    facturaDelete
                });

            })
            .catch(err => {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Este id no existe',
                    error: err
                });
            });

    },

    // Actualiza una factura por su id
    update(req, res) {

        let { id } = req.params;

        const schema = Joi.object().keys({
            item: Joi.string().optional(),
            qty: Joi.number().integer().optional(),
            date: Joi.date().optional(),
            due: Joi.date().optional(),
            rate: Joi.number().optional(),
            tax: Joi.number().optional()
        });

        const { error, value } = Joi.validate(req.body, schema);

        if (error && error.details) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al insertar datos',
                error
            });
        }

        Factura.findOneAndUpdate({ _id: id }, value, { new: true })
            .then(facturaUpdate => {
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
                    facturaUpdate
                });
            })
            .catch(err => {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al actualiza factura el id no existe',
                    err
                });
            });
    }
};