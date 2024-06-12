import database from 'database';
import SessionModel from '../models/session';

const SessionRepository = database.getRepository(SessionModel);

export default SessionRepository;
