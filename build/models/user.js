"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  Schema
} = _mongoose.default;
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    require: [true, 'Username is required']
  },
  password: {
    type: String,
    require: [true, 'Password is required']
  }
});
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.password;
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});
const User = exports.User = _mongoose.default.model('User', userSchema);