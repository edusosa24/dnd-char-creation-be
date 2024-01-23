import { Response, Request, NextFunction } from 'express';
import { Error as iError, isAnIError } from './interfaces/iError';

const errorHandler = (
  err: iError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (isAnIError(err)) {
    return res.status(err.status).json({ error: err.error });
  }

  return res.status(404).json({ error: err.message });
};

export { errorHandler };
