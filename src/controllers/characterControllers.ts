/* eslint-disable */
import { Request, Response, NextFunction } from 'express';
import { errorLog } from '../utils/loggers';
import characterQueries from '../dao/characterQueries';

// GET CONTROLLERS

const getAllCharacters = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await characterQueries.getAll();
    return res.status(200).send(response).end();
  } catch (error: any) {
    errorLog(error);
    // next(error);
  }
};

const getAllFromUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await characterQueries.getAllFromUser(req.params.userId);
    return res.status(200).send(response).end();
  } catch (error: any) {
    errorLog(error);
    // next(error);
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
  } catch (error: any) {
    errorLog(error);
    // next(error);
  }
};

// POST CONTROLLERS

const postCharacter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await characterQueries.createOne(req.body);
    return res.status(201).send(response).end();
  } catch (error: any) {
    errorLog(error);
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
export default {
  getAllCharacters,
  getCharacter,
  getAllFromUser,
  postCharacter,
  //putCharacter,
  //deleteCharacter,
};
