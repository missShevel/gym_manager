import environment from 'environment';
import { NextFunction, Request, Response } from 'express';
import ApiError from 'helpers/ApiError';
import moment from 'moment';
import SessionRepository from 'repositories/session.repository';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sessionId }: { sessionId: string | undefined } = req.cookies;

    if (!sessionId) throw new ApiError('Unathorized');
    const session = await SessionRepository.findOneBy({ id: sessionId });

    if (!session) throw new ApiError('Unathorized');

    const { issuedAt, user } = session.data;
    const now = moment();
    const diff = now.diff(moment(issuedAt));

    if (diff > environment.COOKIE_EXPIRE) throw new ApiError('Session expired');

    res.locals.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
