import environment from 'environment';
import { NextFunction, Request, Response } from 'express';
import moment from 'moment';
import SessionRepository from 'repositories/session.repository';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sessionId }: { sessionId: string | undefined } = req.cookies;

    if (!sessionId) throw new Error('Unathorized');
    const session = await SessionRepository.findOneBy({ id: sessionId });

    if (!session) throw new Error('Unathorized');

    const { issuedAt, user } = session.data;
    const now = moment();
    const diff = now.diff(moment(issuedAt));

    if (diff > environment.COOKIE_EXPIRE) throw new Error('Session expired');

    res.locals.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
  }
};
