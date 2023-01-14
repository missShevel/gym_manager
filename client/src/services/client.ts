import { Client, ICreateClientData, IUpdateClientData } from 'domains';
import { mapErrorByCode } from 'helpers';
import Service from './BaseService';
import FileService from './file';

const fileService = new FileService();

export default class ClientService extends Service {
  private endpoint = '/clients';

  public async getAll() {
    try {
      const res = await this.connector.get<Client[]>(this.endpoint);

      return res.data;
    } catch (e) {
      throw new Error(mapErrorByCode(e.response.data.code));
    }
  }

  public async create(data: ICreateClientData) {
    try {
      let fileId = null;
      if (data.file) {
        const { id } = await fileService.upload(data.file);

        fileId = id;
      }
      const res = await this.connector.post<Client>(this.endpoint, {
        ...data,
        fileId,
        trainerId: data.trainerId || null,
      });

      return res.data;
    } catch (e) {
      throw new Error(mapErrorByCode(e.response.data.code));
    }
  }

  public async updateById(data: IUpdateClientData) {
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
      const res = await this.connector.put<Client>(`${this.endpoint}/${data.id}`, {
        ...data,
        fileId,
        trainerId: data.trainerId || null,
      });
      return res.data;
    } catch (e) {
      throw new Error(mapErrorByCode(e.response.data.code));
    }
  }

  public async deleteById(id: string) {
    try {
      const res = await this.connector.delete<Client>(`${this.endpoint}/${id}`);

      return res.data;
    } catch (e) {
      throw new Error(mapErrorByCode(e.response.data.code));
    }
  }
}
