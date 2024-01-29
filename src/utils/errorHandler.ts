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

  if (err.message.includes('not found') || err.message.includes('not exists')) {
    return res.status(404).json({ error: err.message });
  }
  if (
    err.message.includes('UNAUTHORIZED') ||
    err.message.includes('invalid authorization')
  ) {
    return res.status(401).json({ error: err.message });
  }
  if (
    err.message.includes('missing') ||
    err.message.includes('required') ||
    err.message.includes('must be') ||
    err.message.includes('expired')
  ) {
    return res.status(400).json({ error: err.message });
  }

  return res.status(418).json({ error: err.message });
};

export { errorHandler };
