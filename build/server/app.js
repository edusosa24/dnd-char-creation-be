"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _helmet = _interopRequireDefault(require("helmet"));
var _morgan = _interopRequireDefault(require("morgan"));
var _mongoConfig = require("../configuration/mongoConfig");
var _routes = require("../routes/routes");
var _loggers = _interopRequireDefault(require("../utils/loggers"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const app = (0, _express.default)();
app.use(_express.default.json());
app.use((0, _cors.default)());
app.use((0, _helmet.default)());
app.use((0, _morgan.default)('tiny'));
(0, _mongoConfig.dbConnect)().catch(error => {
  _loggers.default.errorLog(error.message());
});
app.use('/api/characters', _routes.characterRoutes);
app.use('/api/users', _routes.userRoutes);
app.use('/api/login', _routes.loginRoutes);
var _default = exports.default = app;