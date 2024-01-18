"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _character = require("../models/character");
/* eslint-disable */

const getAll = async () => {
  const data = await _character.Character.find().catch(error => {
    throw error;
  });
  return data;
};
const getAllFromUser = async userId => {
  const data = await _character.Character.find({
    user: userId
  }).catch(error => {
    throw error;
  });
  return data;
};
const getOne = async characterId => {
  const data = await _character.Character.findOne({
    id: characterId
  }).catch(error => {
    throw error;
  });
  return data;
};
const createOne = async character => {
  const newCharacter = new _character.Character(character);
  const data = await newCharacter.save().catch(error => {
    throw error;
  });
  return data;
};

/*
const updateOne = async () => {
  const data = await Character.find().catch((error) => {
    throw error;
  });

  return data;
};

const deleteOne = async () => {
  const data = await Character.find().catch((error) => {
    throw error;
  });

  return data;
};
*/
var _default = exports.default = {
  getAll,
  getAllFromUser,
  getOne,
  createOne
};