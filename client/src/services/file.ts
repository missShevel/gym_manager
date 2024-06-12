import { mapErrorByCode } from 'helpers';
import Service from './BaseService';

export default class FileService extends Service {
  private endpoint = '/files';

  public async getById(id: string) {
    try {
      const res = await this.connector.get(`${this.endpoint}/${id}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(res.data);

      return { url, blob: res.data };
    } catch (e) {
      throw new Error(mapErrorByCode(e.response.data.code));
    }
  }

  public async upload(file: File) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await this.connector.post(this.endpoint, formData, {
        headers: {
          'content-type': file.type,
          'Content-Type': 'multipart/form-data',
        },
      });

      return res.data;
    } catch (e) {
      throw new Error(mapErrorByCode(e.response.data.code));
    }
  }
}
