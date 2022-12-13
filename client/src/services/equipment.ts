import { Equipment, ICreateEquipmentData } from 'domains';
import Service from './BaseService';

export default class EquipmentService extends Service {
    private endpoint = '/equipments';

    public async getAll() {
        try {
            const res = await this.connector.get<Equipment[]>(this.endpoint);

            return res.data;
        } catch (e) {
            throw new Error();
        }
    }

    public async create(data: ICreateEquipmentData) {
        try {
            const res = await this.connector.post<Equipment>(this.endpoint, data);

            return res.data;
        } catch (e) {
            throw new Error();
        }
    }
}
