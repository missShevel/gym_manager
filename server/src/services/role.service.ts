import RoleRepository from '../repositories/role.repository';

export default class RoleService {
  private repository = RoleRepository;

  public findById(id: string | null) {
    if (id === null) return null;

    return this.repository.findOneByOrFail({
      id,
    });
  }

  public async findByIdOrFail(id: string | null) {
    if (id === null) throw new Error('Role with id null not found');

    const role = await this.repository.findOneByOrFail({
      id,
    });

    if (!role) throw new Error(`Role with id ${id} not found`);
    return role;
  }
}
