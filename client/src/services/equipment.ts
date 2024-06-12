import { Equipment, ICreateEquipmentData, IUpdateEquipmentData } from 'domains';
import { mapErrorByCode } from 'helpers';
import Service from './BaseService';
import FileService from './file';

const fileService = new FileService();

export default class EquipmentService extends Service {
  private endpoint = '/equipments';

  public async getAll() {
    try {
      const res = await this.connector.get<Equipment[]>(this.endpoint);

      return res.data;
    } catch (e) {
      throw new Error(mapErrorByCode(e.response.data.code));
    }
  }

  public async create(data: ICreateEquipmentData) {
    try {
      let fileId = null;
      if (data.file) {
        const { id } = await fileService.upload(data.file);

        fileId = id;
      }
      const res = await this.connector.post<Equipment>(this.endpoint, {
        ...data,
        fileId,
      });

      return res.data;
    } catch (e) {
      console.log(e);
      throw new Error(mapErrorByCode(e.response.data.code));
    }
  }

  public async updateById(data: IUpdateEquipmentData) {
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
      const res = await this.connector.put<Equipment>(`${this.endpoint}/${data.id}`, {
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
      const res = await this.connector.delete<Equipment>(`${this.endpoint}/${id}`);

      return res.data;
    } catch (e) {
      throw new Error(mapErrorByCode(e.response.data.code));
    }
  }
}
