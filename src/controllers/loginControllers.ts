import userDAO from '../dao/userDAO';
import jwt from 'jsonwebtoken';
import bcrypt from '../utils/bcrypt';
import { errorLog } from '../utils/loggers';
import environment from '../configuration/environment';
import { Request, Response, NextFunction } from 'express';

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const user = await userDAO.getByUsername(username);

    const passwordCorrect =
      user === null
        ? false
        : await bcrypt.checkPassword(password, user.password!);

    if (!(user && passwordCorrect)) {
      next(new Error('Invalid username or password'));
    }

    const userForToken = {
      username: user!.username,
      id: user!._id
    };

    const token = jwt.sign(userForToken, environment.SECRET, {
      expiresIn: 60 * 60 * 24
    });

    return res.status(200).send({ token, username: user!.username }).end();
  } catch (e) {
    errorLog(e);
    next(e);
  }
};

export default { login };
