import {
  getAllCharacters as getAll,
  getCharactersFromUser as getAllFromUser,
  getCharacter as getOne,
  createCharacter as createOne,
  updateCharacter as updateOne,
  deleteCharacter as deleteOne
} from './../dao/dao';
import { Request, Response, NextFunction } from 'express';
import { errorLog } from '../utils/loggers';
import { Character as iCharacter } from '../utils/interfaces/iCharacter';

// GET CONTROLLERS

const getAllCharacters = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await getAll();
    return res.status(200).send(response).end();
  } catch (err) {
    errorLog(err);
    next(err);
  }
};

const getFromUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await getAllFromUser(req.params.userId);
    return res.status(200).send(response).end();
  } catch (err) {
    errorLog(err);
    next(err);
  }
};

const getCharacter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await getOne(req.params.characterId);
    return res.status(200).send(response).end();
  } catch (err) {
    errorLog(err);
    next(err);
  }
};

// POST CONTROLLERS

const postCharacter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const character: iCharacter = {
      ...req.body,
      user: req.params.userId
    };
    const response = await createOne(character);
    return res.status(201).send(response).end();
  } catch (err) {
    errorLog(err);
    next(err);
  }
};

// PUT CONTROLLERS

const putCharacter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await updateOne(req.body, req.params.characterId);
    return res.status(200).send(response).end();
  } catch (err) {
    errorLog(err);
    next(err);
  }
};

// DELETE CONTROLLERS

const deleteCharacter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteOne(req.params.characterId);
    return res.status(204).end();
  } catch (err) {
    errorLog(err);
    next(err);
  }
};

export default {
  getAllCharacters,
  getCharacter,
  getFromUser,
  postCharacter,
  putCharacter,
  deleteCharacter
};
