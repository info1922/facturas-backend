'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _swaggerUiExpress = require('swagger-ui-express');

var _swaggerUiExpress2 = _interopRequireDefault(_swaggerUiExpress);

var _swagger = require('./config/swagger.json');

var _swagger2 = _interopRequireDefault(_swagger);

var _routes = require('./config/routes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var colors = require('colors');
var bodyParser = require('body-parser');

require('./config/config');
var app = (0, _express2.default)();

// API - Docs


app.use('/api-docs', _swaggerUiExpress2.default.serve, _swaggerUiExpress2.default.setup(_swagger2.default, {
    explorer: true
}));

// Body Parser configuración
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Config

_mongoose2.default.connection.openUri(process.env.URLDB, { useNewUrlParser: true }, function (err, res) {
    if (err) {
        throw err;
    } else {
        console.log('DB: '.yellow, 'OK'.green);
    }
});

app.use('/api', _routes.router);

app.get('/', function (req, res) {
    res.status(200).json({
        ok: true,
        mensaje: 'Todo mejor'
    });
});

// Escuchar peticiones
app.listen(process.env.PORT || 3000, function () {
    console.log("                                       ");
    console.log("---------------------------------".white);
    console.log('Express 3000:'.yellow, 'OK'.bold.green);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAuanMiXSwibmFtZXMiOlsiY29sb3JzIiwicmVxdWlyZSIsImJvZHlQYXJzZXIiLCJhcHAiLCJ1c2UiLCJzd2FnZ2VyVWkiLCJzZXJ2ZSIsInNldHVwIiwic3dhZ2dlckRvY3VtZW50IiwiZXhwbG9yZXIiLCJ1cmxlbmNvZGVkIiwiZXh0ZW5kZWQiLCJqc29uIiwibW9uZ29vc2UiLCJjb25uZWN0aW9uIiwib3BlblVyaSIsInByb2Nlc3MiLCJlbnYiLCJVUkxEQiIsInVzZU5ld1VybFBhcnNlciIsImVyciIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJ5ZWxsb3ciLCJncmVlbiIsInJvdXRlciIsImdldCIsInJlcSIsInN0YXR1cyIsIm9rIiwibWVuc2FqZSIsImxpc3RlbiIsIlBPUlQiLCJ3aGl0ZSIsImJvbGQiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7OztBQVNBOzs7O0FBQ0E7Ozs7QUFZQTs7OztBQXJCQSxJQUFNQSxTQUFTQyxRQUFRLFFBQVIsQ0FBZjtBQUNBLElBQUlDLGFBQWFELFFBQVEsYUFBUixDQUFqQjs7QUFFQUEsUUFBUSxpQkFBUjtBQUNBLElBQU1FLE1BQU0sd0JBQVo7O0FBR0E7OztBQUlBQSxJQUFJQyxHQUFKLENBQVEsV0FBUixFQUFxQkMsMkJBQVVDLEtBQS9CLEVBQXNDRCwyQkFBVUUsS0FBVixDQUFnQkMsaUJBQWhCLEVBQWlDO0FBQ25FQyxjQUFVO0FBRHlELENBQWpDLENBQXRDOztBQUlBO0FBQ0E7QUFDQU4sSUFBSUMsR0FBSixDQUFRRixXQUFXUSxVQUFYLENBQXNCLEVBQUVDLFVBQVUsS0FBWixFQUF0QixDQUFSO0FBQ0E7QUFDQVIsSUFBSUMsR0FBSixDQUFRRixXQUFXVSxJQUFYLEVBQVI7O0FBSUE7O0FBRUFDLG1CQUFTQyxVQUFULENBQW9CQyxPQUFwQixDQUE0QkMsUUFBUUMsR0FBUixDQUFZQyxLQUF4QyxFQUErQyxFQUFFQyxpQkFBaUIsSUFBbkIsRUFBL0MsRUFBMEUsVUFBQ0MsR0FBRCxFQUFNQyxHQUFOLEVBQWM7QUFDcEYsUUFBSUQsR0FBSixFQUFTO0FBQ0wsY0FBTUEsR0FBTjtBQUNILEtBRkQsTUFFTztBQUNIRSxnQkFBUUMsR0FBUixDQUFZLE9BQU9DLE1BQW5CLEVBQTJCLEtBQUtDLEtBQWhDO0FBQ0g7QUFDSixDQU5EOztBQVNBdEIsSUFBSUMsR0FBSixDQUFRLE1BQVIsRUFBZ0JzQixjQUFoQjs7QUFFQXZCLElBQUl3QixHQUFKLENBQVEsR0FBUixFQUFhLFVBQUNDLEdBQUQsRUFBTVAsR0FBTixFQUFjO0FBQ3ZCQSxRQUFJUSxNQUFKLENBQVcsR0FBWCxFQUFnQmpCLElBQWhCLENBQXFCO0FBQ2pCa0IsWUFBSSxJQURhO0FBRWpCQyxpQkFBUztBQUZRLEtBQXJCO0FBSUgsQ0FMRDs7QUFRQTtBQUNBNUIsSUFBSTZCLE1BQUosQ0FBV2hCLFFBQVFDLEdBQVIsQ0FBWWdCLElBQVosSUFBb0IsSUFBL0IsRUFBcUMsWUFBTTtBQUN2Q1gsWUFBUUMsR0FBUixDQUFZLHlDQUFaO0FBQ0FELFlBQVFDLEdBQVIsQ0FBWSxvQ0FBb0NXLEtBQWhEO0FBQ0FaLFlBQVFDLEdBQVIsQ0FBWSxnQkFBZ0JDLE1BQTVCLEVBQW9DLEtBQUtXLElBQUwsQ0FBVVYsS0FBOUM7QUFDSCxDQUpEIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xyXG5pbXBvcnQgbW9uZ29vc2UgZnJvbSBcIm1vbmdvb3NlXCI7XHJcbmNvbnN0IGNvbG9ycyA9IHJlcXVpcmUoJ2NvbG9ycycpO1xyXG52YXIgYm9keVBhcnNlciA9IHJlcXVpcmUoJ2JvZHktcGFyc2VyJyk7XHJcblxyXG5yZXF1aXJlKCcuL2NvbmZpZy9jb25maWcnKTtcclxuY29uc3QgYXBwID0gZXhwcmVzcygpO1xyXG5cclxuXHJcbi8vIEFQSSAtIERvY3NcclxuaW1wb3J0IHN3YWdnZXJVaSBmcm9tICdzd2FnZ2VyLXVpLWV4cHJlc3MnO1xyXG5pbXBvcnQgc3dhZ2dlckRvY3VtZW50IGZyb20gJy4vY29uZmlnL3N3YWdnZXIuanNvbic7XHJcblxyXG5hcHAudXNlKCcvYXBpLWRvY3MnLCBzd2FnZ2VyVWkuc2VydmUsIHN3YWdnZXJVaS5zZXR1cChzd2FnZ2VyRG9jdW1lbnQsIHtcclxuICAgIGV4cGxvcmVyOiB0cnVlXHJcbn0pKTtcclxuXHJcbi8vIEJvZHkgUGFyc2VyIGNvbmZpZ3VyYWNpw7NuXHJcbi8vIHBhcnNlIGFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFxyXG5hcHAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiBmYWxzZSB9KSk7XHJcbi8vIHBhcnNlIGFwcGxpY2F0aW9uL2pzb25cclxuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XHJcblxyXG5pbXBvcnQgeyByb3V0ZXIgfSBmcm9tICcuL2NvbmZpZy9yb3V0ZXMnO1xyXG5cclxuLy8gQ29uZmlnXHJcblxyXG5tb25nb29zZS5jb25uZWN0aW9uLm9wZW5VcmkocHJvY2Vzcy5lbnYuVVJMREIsIHsgdXNlTmV3VXJsUGFyc2VyOiB0cnVlIH0sIChlcnIsIHJlcykgPT4ge1xyXG4gICAgaWYgKGVycikge1xyXG4gICAgICAgIHRocm93IGVycjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0RCOiAnLnllbGxvdywgJ09LJy5ncmVlbik7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuXHJcbmFwcC51c2UoJy9hcGknLCByb3V0ZXIpO1xyXG5cclxuYXBwLmdldCgnLycsIChyZXEsIHJlcykgPT4ge1xyXG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xyXG4gICAgICAgIG9rOiB0cnVlLFxyXG4gICAgICAgIG1lbnNhamU6ICdUb2RvIG1lam9yJ1xyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxuXHJcbi8vIEVzY3VjaGFyIHBldGljaW9uZXNcclxuYXBwLmxpc3Rlbihwcm9jZXNzLmVudi5QT1JUIHx8IDMwMDAsICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIpO1xyXG4gICAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cIi53aGl0ZSk7XHJcbiAgICBjb25zb2xlLmxvZygnRXhwcmVzcyAzMDAwOicueWVsbG93LCAnT0snLmJvbGQuZ3JlZW4pO1xyXG59KTsiXX0=