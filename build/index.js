"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));
var _app = _interopRequireDefault(require("./server/app"));
var _environment = _interopRequireDefault(require("./configuration/environment"));
var _loggers = require("./utils/loggers");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
_app.default.listen(_environment.default.PORT, () => {
  (0, _loggers.infoLog)(`Server running on port ${_environment.default.PORT}`);
});