import { NextFunction } from 'express';
import ApiError from 'helpers/ApiError';
import { EntityNotFoundError } from 'typeorm';
import { ValidationError } from 'yup';

export default class BaseController {
  protected sendError(next: NextFunction, error: unknown) {
    console.error(error);

    if (error instanceof ApiError) {
      next(error);
      return;
    }

    if (error instanceof ValidationError) {
      next(new ApiError('Validation error', 400));
      return;
    }

    if (error instanceof EntityNotFoundError) {
      next(new ApiError(`Entity not found: ${error.message}`, 400));
      return;
    }

    next(new ApiError());
  }
}
