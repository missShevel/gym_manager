import File from 'models/file';
import Equipment from 'models/equipment';
import EquipmentRepository from '../repositories/equipment.repository';

interface ICreateEquipment {
  name: string;
  count: number;
  link: string;
  avatar?: File;
}

export interface IUpdateEquipment {
  name?: string;
  count?: number;
  link?: string;
}
export default class EquipmentService {
  private repository = EquipmentRepository;

  public async create(data: ICreateEquipment) {
    return this.repository.save(data);
  }

  public async getAll() {
    return this.repository.find({
      relations: {
        avatar: true,
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
      },
    });
  }

  public async updateEquipment(equipment: Equipment, data: IUpdateEquipment) {
    const newEquipment = this.repository.merge(equipment, data);

    return this.repository.save(newEquipment);
  }

  public async updateEquipmentAvatar(equipment: Equipment, avatar: File | null) {
    return this.repository.save({
      ...equipment,
      avatar,
    });
  }

  public async deleteEquipment(equipment: Equipment) {
    return this.repository.remove(equipment);
  }
}
