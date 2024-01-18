"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRoutes = exports.loginRoutes = exports.default = exports.characterRoutes = void 0;
var _express = require("express");
var _characterControllers = _interopRequireDefault(require("../controllers/characterControllers"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// import userControllers from '../controllers/userControllers';
// import loginControllers from '../controllers/loginControllers';
/*
import {
  validateUser,
  validateCharacter,
  validateAdmin,
} from '../utils/middleware';
*/
const characterRoutes = exports.characterRoutes = (0, _express.Router)();
const userRoutes = exports.userRoutes = (0, _express.Router)();
const loginRoutes = exports.loginRoutes = (0, _express.Router)();
characterRoutes.get('/', _characterControllers.default.getAllCharacters);
characterRoutes.get('/:userId/characters/:id', _characterControllers.default.getCharacter);
characterRoutes.get('/:userId/characters', _characterControllers.default.getAllFromUser);
characterRoutes.post('/:userId/characters', _characterControllers.default.postCharacter);
/*
characterRoutes.put(
  '/:userId/characters/:id',
  characterControllers.putCharacter
);
characterRoutes.delete(
  '/:userId/characters/:id',
  characterControllers.deleteCharacter
);

userRoutes.post('/', () => {});
userRoutes.delete('/:id', () => {});

loginRoutes.post('/', () => {});
*/
var _default = exports.default = {
  characterRoutes,
  userRoutes,
  loginRoutes
};