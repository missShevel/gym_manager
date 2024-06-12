import { UserSex } from 'absctracts';
import database from 'database';
import { areEqual } from 'helpers';
import ApiError from 'helpers/ApiError';
import File from 'models/file';
import Role from 'models/role';
import User from 'models/user';
import ClientRepository from 'repositories/client.repository';
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
  role?: Role;
}

export default class UserService {
  private repository = UserRepository;

  private sessionRepository = SessionRepository;

  private clientRepository = ClientRepository;

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
      throw new ApiError({
        message: "User with such credentials doesn't exist",
        status: 400,
        code: 'USER_NOT_EXISTS',
      });
    }

    const passwordsEqual = await areEqual(data.password, existingUser.passwordHash);
    if (!passwordsEqual) {
      throw new ApiError({
        message: 'Wrong password',
        status: 400,
        code: 'WRONG_PASSWORD',
      });
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
      throw new ApiError({
        message: 'User with such credentials already exists',
        status: 400,
        code: 'USER_EXISTS',
      });
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

  public async findByRoleAndId(id: string, role: string) {
    return this.repository.findOne({
      where: {
        id,
        role: {
          id: role,
        },
      },
      relations: {
        role: true,
      },
    });
  }

  public async deleteUser(user: User) {
    if (user.role.id === 'TRAINER') {
      const clients = await this.clientRepository.find({
        where: {
          trainer: {
            id: user.id,
          },
        },
        relations: {
          trainer: true,
        },
      });
      await this.clientRepository.save(clients.map((c) => ({
        ...c,
        trainer: null,
      })));
    }
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
        throw new ApiError({
          message: 'User with such credentials already exists',
          status: 400,
          code: 'USER_EXISTS',
        });
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
