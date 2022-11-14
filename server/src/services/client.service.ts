import { UserSex, UserStatus } from 'absctracts/user';
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

export default class ClientService {
  private repository = ClientRepository;

  public async create(data: ICreateClient) {
    return this.repository.save(data);
  }
}
