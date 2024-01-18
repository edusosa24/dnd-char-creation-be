"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _loggers = require("../utils/loggers");
var _characterQueries = _interopRequireDefault(require("../dao/characterQueries"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable */

// GET CONTROLLERS

const getAllCharacters = async (req, res, next) => {
  try {
    const response = await _characterQueries.default.getAll();
    return res.status(200).send(response).end();
  } catch (error) {
    (0, _loggers.errorLog)(error);
    // next(error);
  }
};
const getAllFromUser = async (req, res, next) => {
  try {
    const response = await _characterQueries.default.getAllFromUser(req.params.userId);
    return res.status(200).send(response).end();
  } catch (error) {
    (0, _loggers.errorLog)(error);
    // next(error);
  }
};
const getCharacter = async (req, res, next) => {
  try {
    const response = await _characterQueries.default.getOne(req.params.characterId);
    return res.status(200).send(response).end();
  } catch (error) {
    (0, _loggers.errorLog)(error);
    // next(error);
  }
};

// POST CONTROLLERS

const postCharacter = async (req, res, next) => {
  try {
    const response = await _characterQueries.default.createOne(req.body);
    return res.status(201).send(response).end();
  } catch (error) {
    (0, _loggers.errorLog)(error);
    // next(error);
  }
};

// PUT CONTROLLERS
/*
const putCharacter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await characterQueries.updateOne(
      req.params.characterId,
      req.body
    );
    return res.status(200).send(response).end();
  } catch (error: any) {
    errorLog(error);
    // next(error);
  }
};

// DELETE CONTROLLERS

const deleteCharacter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await characterQueries.getFromUser(req.params.characterId);
    return res.status(204).end();
  } catch (error: any) {
    errorLog(error);
    // next(error);
  }
};
*/
var _default = exports.default = {
  getAllCharacters,
  getCharacter,
  getAllFromUser,
  postCharacter
  //putCharacter,
  //deleteCharacter,
};