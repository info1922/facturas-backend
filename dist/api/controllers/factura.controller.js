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
            return res.status(400).json(err);
        });
    },


    // Busca una factura por su id
    findOne: function findOne(req, res) {
        var id = req.params.id;


        _factura2.default.findById(id).then(function (factura) {
            if (!factura) {
                return res.status(404).json({
                    ok: false,
                    mensaje: 'Este id no existe'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGkvY29udHJvbGxlcnMvZmFjdHVyYS5jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbImZpbmRBbGwiLCJyZXEiLCJyZXMiLCJGYWN0dXJhIiwiZmluZCIsInRoZW4iLCJjb3VudCIsImVyciIsInRvdGFsUmVnaXN0cm9zIiwic3RhdHVzIiwianNvbiIsIm9rIiwibWVuc2FqZSIsImZhY3R1cmFzIiwiY2F0Y2giLCJjcmVhdGUiLCJzY2hlbWEiLCJKb2kiLCJvYmplY3QiLCJrZXlzIiwiaXRlbSIsInN0cmluZyIsInJlcXVpcmVkIiwiZXJyb3IiLCJFcnJvciIsInF0eSIsIm51bWJlciIsImludGVnZXIiLCJkYXRlIiwiZHVlIiwicmF0ZSIsIm9wdGlvbmFsIiwidGF4IiwidmFsaWRhdGUiLCJib2R5IiwidmFsdWUiLCJkZXRhaWxzIiwiZmFjdHVyYSIsImZpbmRPbmUiLCJpZCIsInBhcmFtcyIsImZpbmRCeUlkIiwiZGVsZXRlIiwiZmluZEJ5SWRBbmRSZW1vdmUiLCJmYWN0dXJhRGVsZXRlIiwidXBkYXRlIiwiZmluZE9uZUFuZFVwZGF0ZSIsIl9pZCIsIm5ldyIsImZhY3R1cmFVcGRhdGUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztBQUtBO2tCQUNlO0FBQ1g7QUFDQUEsV0FGVyxtQkFFSEMsR0FGRyxFQUVFQyxHQUZGLEVBRU87QUFDZEMsMEJBQVFDLElBQVIsR0FBZUMsSUFBZixDQUFvQixvQkFBWTtBQUN4QkYsOEJBQVFHLEtBQVIsQ0FBYyxVQUFDQyxHQUFELEVBQU1DLGNBQU4sRUFBeUI7QUFDbkMsb0JBQUlELEdBQUosRUFBUztBQUNMLDJCQUFPTCxJQUFJTyxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFDeEJDLDRCQUFJLEtBRG9CO0FBRXhCQyxpQ0FBUztBQUZlLHFCQUFyQixDQUFQO0FBSUg7QUFDRCx1QkFBT1YsSUFBSU8sTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQ3hCQyx3QkFBSSxJQURvQjtBQUV4Qkgsa0RBRndCO0FBR3hCSztBQUh3QixpQkFBckIsQ0FBUDtBQUtILGFBWkQ7QUFhSCxTQWRMLEVBZUtDLEtBZkwsQ0FlVztBQUFBLG1CQUFPWixJQUFJTyxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUIsRUFBRUMsSUFBSSxLQUFOLEVBQWFDLFNBQVNMLEdBQXRCLEVBQXJCLENBQVA7QUFBQSxTQWZYO0FBZ0JILEtBbkJVOzs7QUFxQlg7QUFDQVEsVUF0Qlcsa0JBc0JKZCxHQXRCSSxFQXNCQ0MsR0F0QkQsRUFzQk07QUFDYjs7QUFFQSxZQUFNYyxTQUFTQyxjQUFJQyxNQUFKLEdBQWFDLElBQWIsQ0FBa0I7QUFDN0JDLGtCQUFNSCxjQUFJSSxNQUFKLEdBQWFDLFFBQWIsR0FBd0JDLEtBQXhCLENBQThCLElBQUlDLEtBQUosRUFBOUIsQ0FEdUI7QUFFN0JDLGlCQUFLUixjQUFJUyxNQUFKLEdBQWFDLE9BQWIsR0FBdUJMLFFBQXZCLEdBQWtDQyxLQUFsQyxDQUF3QyxJQUFJQyxLQUFKLEVBQXhDLENBRndCO0FBRzdCSSxrQkFBTVgsY0FBSVcsSUFBSixHQUFXTixRQUFYLEdBQXNCQyxLQUF0QixDQUE0QixJQUFJQyxLQUFKLEVBQTVCLENBSHVCO0FBSTdCSyxpQkFBS1osY0FBSVcsSUFBSixHQUFXTixRQUFYLEdBQXNCQyxLQUF0QixDQUE0QixJQUFJQyxLQUFKLEVBQTVCLENBSndCO0FBSzdCTSxrQkFBTWIsY0FBSVMsTUFBSixHQUFhSyxRQUFiLEVBTHVCO0FBTTdCQyxpQkFBS2YsY0FBSVMsTUFBSixHQUFhSyxRQUFiO0FBTndCLFNBQWxCLENBQWY7O0FBSGEsNEJBWVlkLGNBQUlnQixRQUFKLENBQWFoQyxJQUFJaUMsSUFBakIsRUFBdUJsQixNQUF2QixDQVpaO0FBQUEsWUFZTE8sS0FaSyxpQkFZTEEsS0FaSztBQUFBLFlBWUVZLEtBWkYsaUJBWUVBLEtBWkY7O0FBY2IsWUFBSVosU0FBU0EsTUFBTWEsT0FBbkIsRUFBNEI7QUFDeEIsbUJBQU9sQyxJQUFJTyxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFDeEJDLG9CQUFJLEtBRG9CO0FBRXhCQyx5QkFBUyx5QkFGZTtBQUd4Qlc7QUFId0IsYUFBckIsQ0FBUDtBQUtIOztBQUVEcEIsMEJBQVFZLE1BQVIsQ0FBZW9CLEtBQWYsRUFDSzlCLElBREwsQ0FDVSxtQkFBVztBQUNiLG1CQUFPSCxJQUFJTyxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFDeEJDLG9CQUFJLElBRG9CO0FBRXhCQyx5QkFBUyxpQkFGZTtBQUd4QnlCO0FBSHdCLGFBQXJCLENBQVA7QUFLSCxTQVBMLEVBUUt2QixLQVJMLENBUVcsZUFBTztBQUFFLG1CQUFPWixJQUFJTyxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUJILEdBQXJCLENBQVA7QUFBbUMsU0FSdkQ7QUFTSCxLQXJEVTs7O0FBdURYO0FBQ0ErQixXQXhEVyxtQkF3REhyQyxHQXhERyxFQXdERUMsR0F4REYsRUF3RE87QUFBQSxZQUNScUMsRUFEUSxHQUNEdEMsSUFBSXVDLE1BREgsQ0FDUkQsRUFEUTs7O0FBR2RwQywwQkFBUXNDLFFBQVIsQ0FBaUJGLEVBQWpCLEVBQ0tsQyxJQURMLENBQ1UsbUJBQVc7QUFDYixnQkFBSSxDQUFDZ0MsT0FBTCxFQUFjO0FBQ1YsdUJBQU9uQyxJQUFJTyxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFDeEJDLHdCQUFJLEtBRG9CO0FBRXhCQyw2QkFBUztBQUZlLGlCQUFyQixDQUFQO0FBSUg7QUFDRCxtQkFBT1YsSUFBSU8sTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQ3hCQyxvQkFBSSxJQURvQjtBQUV4QjBCO0FBRndCLGFBQXJCLENBQVA7QUFLSCxTQWJMLEVBY0t2QixLQWRMLENBY1csZUFBTztBQUNWLG1CQUFPWixJQUFJTyxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFDeEJDLG9CQUFJLEtBRG9CO0FBRXhCQyx5QkFBUyxtQkFGZTtBQUd4QlcsdUJBQU9oQjtBQUhpQixhQUFyQixDQUFQO0FBS0gsU0FwQkw7QUFzQkgsS0FqRlU7OztBQW1GWDtBQUNBbUMsVUFwRlcsbUJBb0ZKekMsR0FwRkksRUFvRkNDLEdBcEZELEVBb0ZNO0FBQUEsWUFDUHFDLEVBRE8sR0FDQXRDLElBQUl1QyxNQURKLENBQ1BELEVBRE87OztBQUdicEMsMEJBQVF3QyxpQkFBUixDQUEwQkosRUFBMUIsRUFDS2xDLElBREwsQ0FDVSx5QkFBaUI7QUFDbkIsZ0JBQUksQ0FBQ3VDLGFBQUwsRUFBb0I7QUFDaEIsdUJBQU8xQyxJQUFJTyxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFDeEJDLHdCQUFJLEtBRG9CO0FBRXhCQyw2QkFBUyxnQ0FGZTtBQUd4QmdDO0FBSHdCLGlCQUFyQixDQUFQO0FBS0g7QUFDRCxtQkFBTzFDLElBQUlPLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUN4QkMsb0JBQUksSUFEb0I7QUFFeEJDLHlCQUFTLG1CQUZlO0FBR3hCZ0M7QUFId0IsYUFBckIsQ0FBUDtBQU1ILFNBZkwsRUFnQks5QixLQWhCTCxDQWdCVyxlQUFPO0FBQ1YsbUJBQU9aLElBQUlPLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUN4QkMsb0JBQUksS0FEb0I7QUFFeEJDLHlCQUFTLG1CQUZlO0FBR3hCVyx1QkFBT2hCO0FBSGlCLGFBQXJCLENBQVA7QUFLSCxTQXRCTDtBQXdCSCxLQS9HVTs7O0FBaUhYO0FBQ0FzQyxVQWxIVyxrQkFrSEo1QyxHQWxISSxFQWtIQ0MsR0FsSEQsRUFrSE07QUFBQSxZQUVQcUMsRUFGTyxHQUVBdEMsSUFBSXVDLE1BRkosQ0FFUEQsRUFGTzs7O0FBSWIsWUFBTXZCLFNBQVNDLGNBQUlDLE1BQUosR0FBYUMsSUFBYixDQUFrQjtBQUM3QkMsa0JBQU1ILGNBQUlJLE1BQUosR0FBYVUsUUFBYixFQUR1QjtBQUU3Qk4saUJBQUtSLGNBQUlTLE1BQUosR0FBYUMsT0FBYixHQUF1QkksUUFBdkIsRUFGd0I7QUFHN0JILGtCQUFNWCxjQUFJVyxJQUFKLEdBQVdHLFFBQVgsRUFIdUI7QUFJN0JGLGlCQUFLWixjQUFJVyxJQUFKLEdBQVdHLFFBQVgsRUFKd0I7QUFLN0JELGtCQUFNYixjQUFJUyxNQUFKLEdBQWFLLFFBQWIsRUFMdUI7QUFNN0JDLGlCQUFLZixjQUFJUyxNQUFKLEdBQWFLLFFBQWI7QUFOd0IsU0FBbEIsQ0FBZjs7QUFKYSw2QkFhWWQsY0FBSWdCLFFBQUosQ0FBYWhDLElBQUlpQyxJQUFqQixFQUF1QmxCLE1BQXZCLENBYlo7QUFBQSxZQWFMTyxLQWJLLGtCQWFMQSxLQWJLO0FBQUEsWUFhRVksS0FiRixrQkFhRUEsS0FiRjs7QUFlYixZQUFJWixTQUFTQSxNQUFNYSxPQUFuQixFQUE0QjtBQUN4QixtQkFBT2xDLElBQUlPLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUN4QkMsb0JBQUksS0FEb0I7QUFFeEJDLHlCQUFTLHlCQUZlO0FBR3hCVztBQUh3QixhQUFyQixDQUFQO0FBS0g7O0FBRURwQiwwQkFBUTJDLGdCQUFSLENBQXlCLEVBQUVDLEtBQUtSLEVBQVAsRUFBekIsRUFBc0NKLEtBQXRDLEVBQTZDLEVBQUVhLEtBQUssSUFBUCxFQUE3QyxFQUNLM0MsSUFETCxDQUNVLHlCQUFpQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFPSCxJQUFJTyxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFDeEJDLG9CQUFJLElBRG9CO0FBRXhCQyx5QkFBUyxxQkFGZTtBQUd4QnFDO0FBSHdCLGFBQXJCLENBQVA7QUFLSCxTQWRMLEVBZUtuQyxLQWZMLENBZVcsZUFBTztBQUNWLG1CQUFPWixJQUFJTyxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFDeEJDLG9CQUFJLEtBRG9CO0FBRXhCQyx5QkFBUyw0Q0FGZTtBQUd4Qkw7QUFId0IsYUFBckIsQ0FBUDtBQUtILFNBckJMO0FBc0JIO0FBL0pVLEMiLCJmaWxlIjoiZmFjdHVyYS5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEpvaSBmcm9tICdqb2knO1xyXG5pbXBvcnQgRmFjdHVyYSBmcm9tICcuLi9tb2RlbHMvZmFjdHVyYS5tb2RlbCc7XHJcblxyXG5cclxuXHJcblxyXG4vLyBUb2RhcyBsYXMgb3BlcmFjaW9uZXMgZGUgZmFjdHVyYXNcclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgLy8gT2J0aWVuZSB0b2RhcyBsYXMgZmFjdHVyYXNcclxuICAgIGZpbmRBbGwocmVxLCByZXMpIHtcclxuICAgICAgICBGYWN0dXJhLmZpbmQoKS50aGVuKGZhY3R1cmFzID0+IHtcclxuICAgICAgICAgICAgICAgIEZhY3R1cmEuY291bnQoKGVyciwgdG90YWxSZWdpc3Ryb3MpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvazogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZW5zYWplOiAnRXJyb3IgYWwgY29uc3VsdGFyIHJlZ2lzdHJvcydcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9rOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3RhbFJlZ2lzdHJvcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmFjdHVyYXNcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgb2s6IGZhbHNlLCBtZW5zYWplOiBlcnIgfSkpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBDcmVhIHVuYSBudWV2YSBmYWN0dXJhXHJcbiAgICBjcmVhdGUocmVxLCByZXMpIHtcclxuICAgICAgICAvLyBsZXQgeyBpdGVtLCBxdHksIGRhdGUsIGR1ZSwgcmF0ZSwgdGF4IH0gPSByZXEuYm9keTtcclxuXHJcbiAgICAgICAgY29uc3Qgc2NoZW1hID0gSm9pLm9iamVjdCgpLmtleXMoe1xyXG4gICAgICAgICAgICBpdGVtOiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKS5lcnJvcihuZXcgRXJyb3IoKSksXHJcbiAgICAgICAgICAgIHF0eTogSm9pLm51bWJlcigpLmludGVnZXIoKS5yZXF1aXJlZCgpLmVycm9yKG5ldyBFcnJvcigpKSxcclxuICAgICAgICAgICAgZGF0ZTogSm9pLmRhdGUoKS5yZXF1aXJlZCgpLmVycm9yKG5ldyBFcnJvcigpKSxcclxuICAgICAgICAgICAgZHVlOiBKb2kuZGF0ZSgpLnJlcXVpcmVkKCkuZXJyb3IobmV3IEVycm9yKCkpLFxyXG4gICAgICAgICAgICByYXRlOiBKb2kubnVtYmVyKCkub3B0aW9uYWwoKSxcclxuICAgICAgICAgICAgdGF4OiBKb2kubnVtYmVyKCkub3B0aW9uYWwoKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCB7IGVycm9yLCB2YWx1ZSB9ID0gSm9pLnZhbGlkYXRlKHJlcS5ib2R5LCBzY2hlbWEpO1xyXG5cclxuICAgICAgICBpZiAoZXJyb3IgJiYgZXJyb3IuZGV0YWlscykge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe1xyXG4gICAgICAgICAgICAgICAgb2s6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgbWVuc2FqZTogJ0Vycm9yIGFsIGluc2VydGFyIGRhdG9zJyxcclxuICAgICAgICAgICAgICAgIGVycm9yXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgRmFjdHVyYS5jcmVhdGUodmFsdWUpXHJcbiAgICAgICAgICAgIC50aGVuKGZhY3R1cmEgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcclxuICAgICAgICAgICAgICAgICAgICBvazogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtZW5zYWplOiBcIkRhdG9zIGd1YXJkYWRvc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhY3R1cmFcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHsgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKGVycik7IH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBCdXNjYSB1bmEgZmFjdHVyYSBwb3Igc3UgaWRcclxuICAgIGZpbmRPbmUocmVxLCByZXMpIHtcclxuICAgICAgICBsZXQgeyBpZCB9ID0gcmVxLnBhcmFtcztcclxuXHJcbiAgICAgICAgRmFjdHVyYS5maW5kQnlJZChpZClcclxuICAgICAgICAgICAgLnRoZW4oZmFjdHVyYSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWZhY3R1cmEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvazogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbnNhamU6ICdFc3RlIGlkIG5vIGV4aXN0ZSdcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgb2s6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZmFjdHVyYVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgb2s6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1lbnNhamU6ICdFc3RlIGlkIG5vIGV4aXN0ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGVyclxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8gRWxpbWluYSB1bmEgZmFjdHVyYSBwb3Igc3UgaWRcclxuICAgIGRlbGV0ZShyZXEsIHJlcykge1xyXG4gICAgICAgIGxldCB7IGlkIH0gPSByZXEucGFyYW1zO1xyXG5cclxuICAgICAgICBGYWN0dXJhLmZpbmRCeUlkQW5kUmVtb3ZlKGlkKVxyXG4gICAgICAgICAgICAudGhlbihmYWN0dXJhRGVsZXRlID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghZmFjdHVyYURlbGV0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9rOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVuc2FqZTogJ0Vycm9yIGFsIGVsaW1pbmFyIGVzdGEgZmFjdHVyYScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhY3R1cmFEZWxldGVcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgb2s6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbWVuc2FqZTogJ0ZhY3R1cmEgZWxpbWluYWRhJyxcclxuICAgICAgICAgICAgICAgICAgICBmYWN0dXJhRGVsZXRlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcclxuICAgICAgICAgICAgICAgICAgICBvazogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgbWVuc2FqZTogJ0VzdGUgaWQgbm8gZXhpc3RlJyxcclxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogZXJyXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBBY3R1YWxpemEgdW5hIGZhY3R1cmEgcG9yIHN1IGlkXHJcbiAgICB1cGRhdGUocmVxLCByZXMpIHtcclxuXHJcbiAgICAgICAgbGV0IHsgaWQgfSA9IHJlcS5wYXJhbXM7XHJcblxyXG4gICAgICAgIGNvbnN0IHNjaGVtYSA9IEpvaS5vYmplY3QoKS5rZXlzKHtcclxuICAgICAgICAgICAgaXRlbTogSm9pLnN0cmluZygpLm9wdGlvbmFsKCksXHJcbiAgICAgICAgICAgIHF0eTogSm9pLm51bWJlcigpLmludGVnZXIoKS5vcHRpb25hbCgpLFxyXG4gICAgICAgICAgICBkYXRlOiBKb2kuZGF0ZSgpLm9wdGlvbmFsKCksXHJcbiAgICAgICAgICAgIGR1ZTogSm9pLmRhdGUoKS5vcHRpb25hbCgpLFxyXG4gICAgICAgICAgICByYXRlOiBKb2kubnVtYmVyKCkub3B0aW9uYWwoKSxcclxuICAgICAgICAgICAgdGF4OiBKb2kubnVtYmVyKCkub3B0aW9uYWwoKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCB7IGVycm9yLCB2YWx1ZSB9ID0gSm9pLnZhbGlkYXRlKHJlcS5ib2R5LCBzY2hlbWEpO1xyXG5cclxuICAgICAgICBpZiAoZXJyb3IgJiYgZXJyb3IuZGV0YWlscykge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe1xyXG4gICAgICAgICAgICAgICAgb2s6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgbWVuc2FqZTogJ0Vycm9yIGFsIGluc2VydGFyIGRhdG9zJyxcclxuICAgICAgICAgICAgICAgIGVycm9yXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgRmFjdHVyYS5maW5kT25lQW5kVXBkYXRlKHsgX2lkOiBpZCB9LCB2YWx1ZSwgeyBuZXc6IHRydWUgfSlcclxuICAgICAgICAgICAgLnRoZW4oZmFjdHVyYVVwZGF0ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiAoIXVzdWFyaW8pIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBvazogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIG1lbnNhamU6ICdFbCB1c3VhcmlvIGNvbiBpZCAnICsgaWQgKyAnIG5vIGV4aXN0ZScsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGVycm9yczogeyBtZXNzYWdlOiAnTm8gZXhpc3RlIHVuIHVzdWFyaW8gY29uIGVzZSBJRCcgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcclxuICAgICAgICAgICAgICAgICAgICBvazogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtZW5zYWplOiBcIkZhY3R1cmEgYWN0dWFsaXphZGFcIixcclxuICAgICAgICAgICAgICAgICAgICBmYWN0dXJhVXBkYXRlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG9rOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBtZW5zYWplOiAnRXJyb3IgYWwgYWN0dWFsaXphIGZhY3R1cmEgZWwgaWQgbm8gZXhpc3RlJyxcclxuICAgICAgICAgICAgICAgICAgICBlcnJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxufTsiXX0=