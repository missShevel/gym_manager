import EquipmentRepository from '../repositories/equipment.repository';
import File from 'models/file';

interface ICreateEquipment {
  name: string;
  count: number;
  link: string;
  avatar?: File;
}

export default class EquipmentService {
  private repository = EquipmentRepository;

  public async create(data: ICreateEquipment) {
    return this.repository.save(data);
  }

  public async getAll() {
    return this.repository.find();
  }

  public async findById(id: string) {
    return this.repository.findOne({
      where: {
        id
      },
      relations: {
        avatar: true,
      }
    });
  }
}
