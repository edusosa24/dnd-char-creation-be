import { Request, Response, NextFunction } from 'express';
import userDao from './../dao/userDAO';
import { User as iUser } from '../utils/interfaces/iUser';
import { encryptPassword } from '../utils/bcrypt';
import { errorLog } from '../utils/loggers';

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await userDao.getAllUsers();
    return res.status(200).send(response);
  } catch (err) {
    errorLog(err);
    next(err);
  }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await userDao.getUsersById(req.params.userId);
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
    const response = await userDao.createUser(user);
    return res.status(201).send(response);
  } catch (err) {
    errorLog(err);
    next(err);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await userDao.deleteUser(req.params.userId);
    return res.status(204).send(response);
  } catch (err) {
    errorLog(err);
    next(err);
  }
};

export default { getAllUsers, getUser, postUser, deleteUser };
