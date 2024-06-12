import { UserSex, UserStatus } from 'absctracts/user';
import Client from 'models/client';
import File from 'models/file';
import User from 'models/user';
import ClientRepository from '../repositories/client.repository';

interface ICreateClient {
  firstName: string;
  lastName: string;
  sex: UserSex;
  status: UserStatus;
  details: string;
  avatar?: File;
  trainer?: User | null;
}

export interface IUpdateClient {
  firstName?: string;
  lastName?: string;
  sex?: UserSex;
  status?: UserStatus;
  details?: string;
}

export default class ClientService {
  private repository = ClientRepository;

  public async create(data: ICreateClient) {
    return this.repository.save(data);
  }

  public async getAll() {
    return this.repository.find({
      relations: {
        avatar: true,
        trainer: true,
      },
    });
  }

  public async findById(id: string) {
    return this.repository.findOne({
      where: {
        id,
      },
      relations: {
        avatar: true,
        trainer: true,
      },
    });
  }

  public async updateClient(client: Client, data: IUpdateClient) {
    const newClient = this.repository.merge(client, data);

    return this.repository.save(newClient);
  }

  public async updateClientAvatar(client: Client, avatar: File | null) {
    return this.repository.save({
      ...client,
      avatar,
    });
  }

  public async updateClientTrainer(client: Client, trainer: User | null) {
    return this.repository.save({
      ...client,
      trainer,
    });
  }

  public async deleteClient(client: Client) {
    return this.repository.remove(client);
  }
}
