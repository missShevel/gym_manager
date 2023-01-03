import { Client, ICreateClientData, IUpdateClientData } from 'domains';
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
            throw new Error();
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
            });

            return res.data;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    public async updateById(data: IUpdateClientData) {
        try {
            let fileId;
            if (data.file) { // new file
                const { id } = await fileService.upload(data.file);

                fileId = id;
            } else { // old file or it is deleted
                fileId = data.fileId || null;
            }
            const res = await this.connector.put<Client>(`${this.endpoint}/${data.id}`, {
                ...data,
                fileId,
            });
            return res.data;
        } catch (e) {
            throw new Error();
        }
    }

    public async deleteById(id: string) {
        try {
            const res = await this.connector.delete<Client>(`${this.endpoint}/${id}`);

            return res.data;
        } catch (e) {
            throw new Error();
        }
    }
}
