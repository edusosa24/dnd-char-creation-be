"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.infoLog = exports.errorLog = exports.default = void 0;
/* eslint-disable */
const infoLog = (...messages) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...messages);
  }
};
exports.infoLog = infoLog;
const errorLog = (...errors) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...errors);
  }
};
exports.errorLog = errorLog;
var _default = exports.default = {
  infoLog,
  errorLog
};