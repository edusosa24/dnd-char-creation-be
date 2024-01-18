"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dbConnect = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _loggers = _interopRequireDefault(require("../utils/loggers"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const dbConnect = async () => {
  try {
    const mongoURL = process.env.NODE_ENV !== 'test' ? process.env.MONGO_URI : process.env.MONGO_TEST;
    _mongoose.default.set('strictQuery', false);
    _loggers.default.infoLog('Connecting to', mongoURL);
    await _mongoose.default.connect(mongoURL);
    _loggers.default.infoLog('Connected to DB');
  } catch (error) {
    _loggers.default.errorLog('Error connecting to DB.', error.message());
  }
};
exports.dbConnect = dbConnect;