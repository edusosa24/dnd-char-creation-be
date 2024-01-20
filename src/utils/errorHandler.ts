import { Response, Request, NextFunction } from 'express';

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (typeof err === typeof Array) {
    return res.status(400).send(err);
  }
};

export { errorHandler };
