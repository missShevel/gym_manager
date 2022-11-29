import { UserSex } from 'absctracts';
import { areEqual } from 'helpers';
import File from 'models/file';
import Role from 'models/role';
import SessionRepository from 'repositories/session.repository';
import UserRepository from '../repositories/user.repository';

interface ISignInData {
  email: string;
  password: string;
}

interface ICreateData {
  firstName: string
  lastName: string
  email: string,
  sex?: UserSex,
  passwordHash: string,
  avatar?: File,
  role: Role
}

export default class UserService {
  private repository = UserRepository;

  private sessionRepository = SessionRepository;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, class-methods-use-this
  public async signIn(data: ISignInData) {
    const existingUser = await this.repository.findOne({
      where: {
        email: data.email,
      },
      relations: {
        role: true,
      },
    });

    if (!existingUser) {
      throw new Error("User with such credentials doesn't exist");
    }

    const passwordsEqual = await areEqual(data.password, existingUser.passwordHash);
    if (!passwordsEqual) {
      throw new Error('Wrong password');
    }

    const session = await this.sessionRepository.save({
      data: {
        user: existingUser,
        issuedAt: Date.now(),
      },
      user: existingUser,
    });

    return { session, user: existingUser };
  }

  public async create(data: ICreateData) {
    const existingUser = await this.repository.findOne({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      throw new Error('User with such credentials already exists');
    }

    return this.repository.save(data);
  }
}
