import { checkSchema, header } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import environment from '../../../configuration/environment';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dao from '../../../dao/userDAO';

const tokenIsValid = async (authorization: string) => {
  if (!(authorization && authorization.startsWith('Bearer '))) {
    return false;
  }
  const auth = authorization.replace('Bearer ', '');

  const decodedToken = jwt.verify(auth, environment.SECRET) as JwtPayload;
  if (!decodedToken.id) {
    return false;
  }

  const user = await dao.getByUsername(decodedToken.username);
  if (!user) {
    return false;
  }

  return true;
};

const tokenFromUser = (authorization: string, userId: string) => {
  const auth = authorization.replace('Bearer ', '');
  const decodedToken = jwt.verify(auth, environment.SECRET) as JwtPayload;
  if (decodedToken.id !== userId) {
    return false;
  }
  return true;
};

export const validateCredentials = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await checkSchema(
    {
      authorization: {
        in: 'headers',
        custom: {
          options: tokenIsValid,
          errorMessage: 'Credentials are invalid',
          bail: {
            level: 'request'
          }
        }
      }
    },
    ['headers']
  ).run(req);

  const errors = result
    .filter((validation) => validation.context.errors.length !== 0)
    .map((validation) => validation.context.message);

  if (
    errors.length === 0 &&
    !tokenFromUser(req.headers.authorization!, req.params.userId)
  ) {
    errors.concat('Invalid credentials for this route');
  }

  if (errors.length !== 0) {
    next(errors);
  }

  next();
};
