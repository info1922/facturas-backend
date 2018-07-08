import express from 'express';
import facturaController from '../api/controllers/factura.controller';

export const router = express.Router();

// Facturas
router.get('/facturas', facturaController.findAll);
router.get('/facturas/:id', facturaController.findOne);
router.delete('/facturas/:id', facturaController.delete);
router.put('/facturas/:id', facturaController.update);
router.post('/facturas', facturaController.create);