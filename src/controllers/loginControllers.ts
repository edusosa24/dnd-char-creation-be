import { Request, Response, NextFunction } from 'express';
import { getUsersByUsername } from './../dao/userDAO';
import jwt from 'jsonwebtoken';
import bcrypt from '../utils/bcrypt';
import { errorLog } from '../utils/loggers';
import environment from '../configuration/environment';

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const username: string = req.headers.username as string;
    const password: string = req.headers.password as string;

    const user = await getUsersByUsername(username);

    const passwordCorrect =
      user === null
        ? false
        : await bcrypt.checkPassword(password, user.password!);

    if (!(user && passwordCorrect)) {
      throw new Error('Invalid username or password');
    }

    const userForToken = {
      username: user!.username,
      id: user!._id
    };

    const token = jwt.sign(userForToken, environment.SECRET);

    return res
      .status(200)
      .send({
        token,
        username: user!.username,
        userId: user!._id
      })
      .end();
  } catch (e) {
    errorLog(e);
    next(e);
  }
};

export default { login };
