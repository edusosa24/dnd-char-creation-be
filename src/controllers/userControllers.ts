import {
  getAllUsers as getAll,
  getUsersById as getById,
  createUser as createOne,
  deleteUser as deleteOne
} from './../dao/dao';
import { Request, Response, NextFunction } from 'express';
import { errorLog } from '../utils/loggers';
import { encryptPassword } from '../utils/bcrypt';
import { User as iUser } from '../utils/interfaces/iUser';

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await getAll();
    return res.status(200).send(response);
  } catch (err) {
    errorLog(err);
    next(err);
  }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await getById(req.params.userId);
    return res.status(200).send(response);
  } catch (err) {
    errorLog(err);
    next(err);
  }
};

const postUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: iUser = {
      ...req.body,
      campaigns: [],
      characters: []
    };
    user.password = await encryptPassword(user.password);
    const response = await createOne(user);
    return res.status(201).send(response);
  } catch (err) {
    errorLog(err);
    next(err);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await deleteOne(req.params.userId);
    return res.status(204).send(response);
  } catch (err) {
    errorLog(err);
    next(err);
  }
};

export default { getAllUsers, getUser, postUser, deleteUser };
