/* eslint-disable */
import { Request, Response, NextFunction } from 'express';
import { errorLog } from '../utils/loggers';
import characterQueries from '../dao/characterQueries';
import { validationResult } from 'express-validator';

// GET CONTROLLERS

const getAllCharacters = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await characterQueries.getAll();
    return res.status(200).send(response).end();
  } catch (err) {
    errorLog(err);
    next(err);
  }
};

const getFromUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await characterQueries.getFromUser(req.params.userId);
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
    const response = await characterQueries.getOne(req.params.characterId);
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
    const result = validationResult(req);
    if (!result.isEmpty) {
      return res.status(400).send(result.mapped());
    }

    const response = await characterQueries.createOne(req.body);
    return res.status(201).send(response).end();
  } catch (err: any) {
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
    const response = await characterQueries.updateOne(
      req.params.characterId,
      req.body
    );
    return res.status(200).send(response).end();
  } catch (err: any) {
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
    await characterQueries.getFromUser(req.params.characterId);
    return res.status(204).end();
  } catch (err: any) {
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
