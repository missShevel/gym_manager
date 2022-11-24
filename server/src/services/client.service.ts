import { UserSex, UserStatus } from 'absctracts/user';
import Client from 'models/client';
import File from 'models/file';
import ClientRepository from '../repositories/client.repository';

interface ICreateClient {
  firstName: string;
  lastName: string;
  sex: UserSex;
  status: UserStatus;
  details: string;
  avatar?: File;
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
    return this.repository.find();
  }

  public async findById(id: string) {
    return this.repository.findOne({
      where: {
        id,
      },
      relations: {
        avatar: true,
      },
    });
  }

  public async updateClient(client: Client, data: IUpdateClient) {
    const newClient = this.repository.merge(client, data);

    return this.repository.save(newClient);
  }

  public async updateClientAvatar(client: Client, avatar: File) {
    return this.repository.save({
      ...client,
      avatar,
    });
  }

  public async deleteClient(client: Client) {
    return this.repository.remove(client);
  }
}
