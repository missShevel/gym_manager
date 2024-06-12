import { ISignInData, User, ICreateUserData, IUpdateUserData, ROLES } from 'domains';
import { mapErrorByCode } from 'helpers';
import Service from './BaseService';
import FileService from './file';

const fileService = new FileService();

export default class UserService extends Service {
  private endpoint = '/users';

  public async getAll(role: ROLES) {
    try {
      const res = await this.connector.get<User[]>(`${this.endpoint}/?role=${role}`);

      return res.data;
    } catch (e) {
      throw new Error(mapErrorByCode(e.response.data.code));
    }
  }

  public async getShortlist(role: ROLES) {
    try {
      const res = await this.connector.get<User[]>(`${this.endpoint}/shortList?role=${role}`);

      return res.data;
    } catch (e) {
      throw new Error(mapErrorByCode(e.response.data.code));
    }
  }

  public async create(data: ICreateUserData) {
    try {
      let fileId = null;
      if (data.file) {
        const { id } = await fileService.upload(data.file);

        fileId = id;
      }
      const res = await this.connector.post<User>(this.endpoint, {
        ...data,
        fileId,
      });

      return res.data;
    } catch (e) {
      throw new Error(mapErrorByCode(e.response.data.code));
    }
  }

  public async updateById(data: IUpdateUserData) {
    try {
      let fileId;
      if (data.file) {
        // new file
        const { id } = await fileService.upload(data.file);

        fileId = id;
      } else {
        // old file or it is deleted
        fileId = data.fileId || null;
      }
      const res = await this.connector.put<User>(`${this.endpoint}/${data.id}`, {
        ...data,
        fileId,
      });
      return res.data;
    } catch (e) {
      throw new Error(mapErrorByCode(e.response.data.code));
    }
  }

  public async deleteById(id: string) {
    try {
      const res = await this.connector.delete<User>(`${this.endpoint}/${id}`);

      return res.data;
    } catch (e) {
      throw new Error(mapErrorByCode(e.response.data.code));
    }
  }

  async signIn(data: ISignInData) {
    try {
      const user = await this.connector.post<User>(`${this.endpoint}/sign-in`, data);

      return user.data;
    } catch (e) {
      if (e.response) {
        throw new Error(mapErrorByCode(e.response.data.code));
      }
    }
  }

  async me() {
    try {
      const user = await this.connector.get<User>(`${this.endpoint}/me`);

      return user.data;
    } catch (e) {
      throw new Error(mapErrorByCode(e.response.data.code));
    }
  }

  async logout() {
    try {
      const user = await this.connector.get<User>(`${this.endpoint}/logout`);

      return user.data;
    } catch (e) {
      throw new Error(mapErrorByCode(e.response.data.code));
    }
  }
}
