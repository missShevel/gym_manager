import SessionRepository from '../repositories/session.repository';

export default class SessionService {
  private repository = SessionRepository;

  public async deleteById(sessionId: string) {
    return this.repository.delete({ id: sessionId });
  }
}
