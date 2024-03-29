import { checkSchema, checkExact, validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import { Character } from '../../../models/character';
import { Campaign } from '../../../models/campaign';
import { Error as iError } from '../../interfaces/iError';

const checkCharacter = async (character: string) => {
  const char = await Character.findOne({ _id: character });
  if (!char) {
    throw new Error(`character id: ${character} does not exists`);
  }

  return true;
};

const checkDuplicates = async (characters: string[]) => {
  const duplicates = characters.filter(
    (item, index) => characters.indexOf(item) !== index
  );
  if (duplicates.length > 0) {
    throw new Error('duplicated characters are invalid');
  }

  return true;
};

const checkExistance = async (campaignId: string) => {
  const campaign = await Campaign.findOne({ _id: campaignId });
  if (!campaign) {
    throw new Error('campaign not found');
  }

  return true;
};

export const validateCampaignExistance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await checkSchema(
    {
      campaignId: {
        custom: {
          options: checkExistance,
          bail: true
        }
      }
    },
    ['params']
  ).run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const msg: string[] = errors.array().map((er) => `${er.msg}`);
    const error: iError = {
      error: msg,
      status: 404
    };
    next(error);
  }
  next();
};

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
            errorMessage: 'characters are required',
            bail: true
          },
          isArray: {
            errorMessage: 'characters must be an array',
            bail: true
          },
          custom: {
            options: checkDuplicates,
            bail: true
          }
        },
        'characters.*': {
          optional: true,
          isString: {
            errorMessage: 'characters should be id strings',
            bail: true
          },
          custom: {
            options: checkCharacter,
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
  validateCampaignCreate,
  validateCampaignExistance,
  validateCampaignUpdate
};
