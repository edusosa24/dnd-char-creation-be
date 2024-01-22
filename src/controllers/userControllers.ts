import { Request, Response, NextFunction } from 'express';
import { errorLog } from '../utils/loggers';
import userDAO from '../dao/userDAO';

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await userDAO.getAll();
    return res.status(200).send(response);
  } catch (err) {
    errorLog(err);
    next(err);
  }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await userDAO.getById(req.params.userId);
    return res.status(200).send(response);
  } catch (err) {
    errorLog(err);
    next(err);
  }
};

const postUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await userDAO.createOne(req.body);
    return res.status(201).send(response);
  } catch (err) {
    errorLog(err);
    next(err);
  }
};

export default { getAllUsers, getUser, postUser };
