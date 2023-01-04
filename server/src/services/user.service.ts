import { UserSex } from 'absctracts';
import database from 'database';
import { areEqual } from 'helpers';
import ApiError from 'helpers/ApiError';
import File from 'models/file';
import Role from 'models/role';
import User from 'models/user';
import SessionRepository from 'repositories/session.repository';
import { Brackets } from 'typeorm';
import UserRepository from '../repositories/user.repository';

interface ISignInData {
  email: string;
  password: string;
}

interface ICreateData {
  firstName: string;
  lastName: string;
  email: string;
  sex?: UserSex;
  passwordHash: string;
  avatar: File | null;
  role: Role;
}

export interface IUpdateData {
  firstName?: string;
  lastName?: string;
  email?: string;
  sex?: UserSex;
}

interface ISearchData {
  search?: string;
  role?: Role
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
        avatar: true,
      },
    });

    if (!existingUser) {
      throw new ApiError("User with such credentials doesn't exist", 400);
    }

    const passwordsEqual = await areEqual(data.password, existingUser.passwordHash);
    if (!passwordsEqual) {
      throw new ApiError('Wrong password', 400);
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
      throw new ApiError('User with such credentials already exists', 400);
    }

    return this.repository.save(data);
  }

  // eslint-disable-next-line class-methods-use-this
  public async getAll(data?: ISearchData) {
    const qb = database
      .getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('user.avatar', 'avatar');

    if (data?.role) {
      qb.where('user.roleId = :roleId', { roleId: data.role.id });
    }

    if (data?.search) {
      qb.andWhere(
        new Brackets((qb1) => {
          qb1
            .where('user.firstName = :search', { search: data.search })
            .orWhere('user.lastName = :search', { search: data.search })
            .orWhere('user.email = :search', { search: data.search });
        }),
      );
    }

    return qb.getMany();
  }

  public async findById(id: string) {
    return this.repository.findOne({
      where: {
        id,
      },
      relations: {
        role: true,
      },
    });
  }

  public async deleteUser(user: User) {
    return this.repository.remove(user);
  }

  public async updateData(user: User, data: IUpdateData) {
    if (data.email && user.email !== data.email) {
      const existingUser = await this.repository.findOne({
        where: {
          email: data.email,
        },
      });

      if (existingUser) {
        throw new ApiError('User with such credentials already exists', 400);
      }
    }
    const updateData = this.repository.merge(user, data);

    return this.repository.save(updateData);
  }

  public async updateAvatar(user: User, file: File | null) {
    const updateData = this.repository.merge(user, {
      avatar: file,
    });

    return this.repository.save(updateData);
  }

  public async updatePassword(user: User, passwordHash: string) {
    const updateData = this.repository.merge(user, {
      passwordHash,
    });

    return this.repository.save(updateData);
  }
}
