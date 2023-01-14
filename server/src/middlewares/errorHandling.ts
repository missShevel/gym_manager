import environment from 'environment';
import { NextFunction, Request, Response } from 'express';
import ApiError from 'helpers/ApiError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  console.log(err);

  return res.status(err.status).json({
    success: false,
    status: err.status,
    message: err.message,
    code: err.code,
    stack: environment.isDevelopment && err.stack,
  });
};
