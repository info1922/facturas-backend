'use strict';

/**
 * Modelo factura
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var facturaSchema = new Schema({
    item: { type: String, required: [true, 'El item es necesario'] },
    qty: { type: Number, required: [true, 'La cantidad es necesaria'] },
    date: { type: Date, required: [true, 'La fecha es necesaria'] },
    due: { type: Date, required: [true, 'La fecha es necesaria'] },
    rate: { type: Number },
    tax: { type: Number }
});

module.exports = mongoose.model('Factura', facturaSchema);
//# sourceMappingURL=factura.model.js.map