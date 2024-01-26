import { Request, Response, NextFunction } from 'express';
import characterDao from './../dao/characterDAO';
import { Character as iCharacter } from '../utils/interfaces/iCharacter';
import { errorLog } from '../utils/loggers';

// GET CONTROLLERS

const getAllCharacters = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await characterDao.getAllCharacters();
    return res.status(200).send(response).end();
  } catch (err) {
    errorLog(err);
    next(err);
  }
};

const getFromUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await characterDao.getCharactersFromUser(
      req.params.userId
    );
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
    const response = await characterDao.getCharacter(req.params.characterId);
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
    const response = await characterDao.createCharacter(character);
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
    const response = await characterDao.updateCharacter(
      req.body,
      req.params.characterId
    );
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
    await characterDao.deleteCharacter(req.params.characterId);
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
