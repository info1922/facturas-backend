/**
 * Modelo factura
 */

const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let facturaSchema = new Schema({
    item: { type: String, required: [true, 'El item es necesario'] },
    qty: { type: Number, required: [true, 'La cantidad es necesaria'] },
    date: { type: Date, required: [true, 'La fecha es necesaria'] },
    due: { type: Date, required: [true, 'La fecha es necesaria'] },
    rate: { type: Number },
    tax: { type: Number }
});

module.exports = mongoose.model('Factura', facturaSchema);