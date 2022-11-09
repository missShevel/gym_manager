import User from 'models/model';
import UserRepository from '../repositories/user.repository';

interface ISignUpData {
  firstName: string;
  lastName: string;
}

export default class UserService {
  private repository = UserRepository;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, class-methods-use-this
  public async signUp(data: ISignUpData): Promise<User> {
    return this.repository.save(data);
  }
}
