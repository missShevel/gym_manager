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
      next(new ApiError({
        message: 'Validation error',
        status: 400,
        code: 'VALIDATION_ERROR',
      }));
      return;
    }

    if (error instanceof EntityNotFoundError) {
      next(new ApiError({
        message: `Entity not found: ${error.message}`,
        status: 404,
        code: 'NOT_FOUND',
      }));
      return;
    }

    next(new ApiError({}));
  }
}
