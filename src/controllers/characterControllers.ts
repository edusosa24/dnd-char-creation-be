import { Request, Response, NextFunction } from 'express';
import { errorLog } from '../utils/loggers';
import characterDAO from '../dao/characterDAO';

// GET CONTROLLERS

const getAllCharacters = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await characterDAO.getAll();
    return res.status(200).send(response).end();
  } catch (err) {
    errorLog(err);
    next(err);
  }
};

const getFromUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await characterDAO.getFromUser(req.params.userId);
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
    const response = await characterDAO.getOne(req.params.characterId);
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
    const response = await characterDAO.createOne(req.body);
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
    const response = await characterDAO.updateOne(
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
    await characterDAO.getFromUser(req.params.characterId);
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
