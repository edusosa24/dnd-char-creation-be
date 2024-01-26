import {
  CustomValidator,
  checkSchema,
  validationResult
} from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import environment from '../../../configuration/environment';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../../../models/user';
import { Error as iError } from '../../interfaces/iError';

const tokenIsValid: CustomValidator = async (authorization: string) => {
  if (!authorization.startsWith('Bearer ')) {
    throw new Error('invalid authorization');
  }

  const auth = authorization.replace('Bearer ', '');
  const decodedToken = jwt.verify(auth, environment.SECRET) as JwtPayload;

  if (!decodedToken.id) {
    throw new Error('invalid authorization');
  }

  const user = await User.findOne({ username: decodedToken.username });

  if (!user) {
    throw new Error('invalid authorization');
  }

  return true;
};

const tokenFromUser = (authorization: string, userId: string) => {
  try {
    const auth = authorization.replace('Bearer ', '');
    const decodedToken = jwt.verify(auth, environment.SECRET) as JwtPayload;
    if (decodedToken.id !== userId) {
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
};

export const validateCredentials = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (process.env.NODE_ENV === 'test') {
    next();
    return;
  }

  await checkSchema(
    {
      Authorization: {
        exists: {
          errorMessage: 'authorization is required',
          bail: true
        },
        validToken: {
          custom: tokenIsValid,
          bail: true
        }
      }
    },
    ['headers']
  ).run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const msg: string[] = errors.array().map((er) => `${er.msg}`);
    const error: iError = {
      error: msg,
      status: 401
    };
    next(error);
  } else if (!tokenFromUser(req.headers.authorization!, req.params.userId)) {
    const error: iError = {
      error: 'invalid authorization',
      status: 401
    };
    next(error);
  }
  next();
};

export const validateAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await checkSchema(
    {
      username: {
        equals: {
          options: environment.ADMIN_USER,
          errorMessage: 'UNAUTHORIZED',
          bail: {
            level: 'request'
          }
        }
      },
      password: {
        equals: {
          options: environment.ADMIN_PASSWORD,
          errorMessage: 'UNAUTHORIZED',
          bail: {
            level: 'request'
          }
        }
      }
    },
    ['body']
  ).run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const msg: string[] = errors.array().map((er) => `${er.msg}`);
    const error: iError = {
      error: msg,
      status: 401
    };
    next(error);
  }
  next();
};

export default {
  validateCredentials,
  validateAdmin
};
