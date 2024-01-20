import { NextFunction, Request, Response } from 'express';

const validateAdmin = (req: Request, res: Response, next: NextFunction) => {
  next();
};

const validateUser = (req: Request, res: Response, next: NextFunction) => {
  next();
};
