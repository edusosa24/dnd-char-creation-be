import { checkSchema, checkExact, validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import { Error as iError } from '../../interfaces/iError';

export const validateCampaignCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await checkExact(
    checkSchema(
      {
        name: {
          exists: {
            errorMessage: 'name is required',
            bail: true
          },
          isString: {
            errorMessage: 'name must be a string',
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

export const validateCampaignUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await checkExact(
    checkSchema(
      {
        name: {
          exists: {
            errorMessage: 'name is required',
            bail: true
          },
          isString: {
            errorMessage: 'name must be a string',
            bail: true
          }
        },
        characters: {
          exists: {
            errorMessage: 'name is required',
            bail: true
          },
          isArray: {
            errorMessage: 'characters must be an array',
            bail: true
          }
        },
        'characters.*': {
          optional: true,
          isString: {
            errorMessage: 'characters should be the id as strings',
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
