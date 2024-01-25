import { checkSchema, checkExact, validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import environment from '../../../configuration/environment';
import { Error as iError } from '../../interfaces/iError';

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

export const validateUserLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await checkExact(
    checkSchema(
      {
        username: {
          exists: {
            errorMessage: 'missing credentials',
            bail: {
              level: 'request'
            }
          },
          isString: {
            errorMessage: 'invalida username or password',
            bail: {
              level: 'request'
            }
          },
          isLength: {
            options: { min: 6, max: 12 },
            errorMessage: 'invalida username or password',
            bail: {
              level: 'request'
            }
          }
        },
        password: {
          exists: {
            errorMessage: 'missing credentials',
            bail: {
              level: 'request'
            }
          },
          isString: {
            errorMessage: 'invalida username or password',
            bail: {
              level: 'request'
            }
          },
          isLength: {
            errorMessage: 'invalida username or password',
            options: { min: 8, max: 20 },
            bail: {
              level: 'request'
            }
          }
        }
      },
      ['headers']
    )
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

export const validateUserCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await checkExact(
    checkSchema(
      {
        username: {
          exists: {
            errorMessage: 'username is required',
            bail: true
          },
          isString: {
            errorMessage: 'username must be a string',
            bail: true
          },
          isLength: {
            options: { min: 6, max: 12 },
            errorMessage: 'username should be between 6 and 12 characters long',
            bail: true
          }
        },
        password: {
          exists: {
            errorMessage: 'password is required',
            bail: true
          },
          isString: {
            errorMessage: 'password must be a string',
            bail: true
          },
          isLength: {
            options: { min: 8, max: 20 },
            errorMessage: 'password should be between 8 and 20 characters long',
            bail: true
          }
        }
      },
      ['body']
    )
  ).run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const msg: string[] = errors.array().map((er) => `${er.msg}`);
    const error: iError = {
      error: msg,
      status: 400
    };
    next(error);
  }
  next();
};

export default {
  validateUserCreate,
  validateUserLogin,
  validateAdmin
};
