/* eslint-disable class-methods-use-this */
import fse from 'fs-extra';
import path from 'path';
import { MigrationInterface, QueryRunner } from 'typeorm';
import RoleRepository from 'repositories/role.repository';
import FileRepository from 'repositories/file.repository';
import Role from 'models/role';
import { encrypt } from 'helpers';
import { UserSex, UserStatus } from 'absctracts/user';
import EquipmentRepository from 'repositories/equipment.repository';
import UserRepository from 'repositories/user.repository';
import ClientRepository from 'repositories/client.repository';
import permissions from './seeds/permissions.json';
import files from './seeds/files.json';
import equipments from './seeds/equipments.json';
import users from './seeds/users.json';
import clients from './seeds/clients.json';

const seedsFolder = path.join(__dirname, 'files');
const resultFolder = path.join(__dirname, '../', 'files');

export class Seeds1668457378854 implements MigrationInterface {
  public async up(): Promise<void> {
    await FileRepository.save(files);
    const mappedEquipments = await Promise.all(
      equipments.map(async (e) => ({
        ...e,
        avatar: e.avatar ? await FileRepository.findOneBy({ id: e.avatar }) : undefined,
      })),
    );
    await EquipmentRepository.save(mappedEquipments);
    await RoleRepository.save(permissions);
    const mappedUsers = await Promise.all(
      users.map(async (u) => ({
        ...u,
        sex: u.sex as UserSex,
        passwordHash: await encrypt(u.password),
        avatar: u.avatar ? await FileRepository.findOneBy({ id: u.avatar }) : undefined,
        role: (await RoleRepository.findOneBy({ id: u.role })) as Role,
      })),
    );
    await UserRepository.save(mappedUsers);
    const mappedClients = await Promise.all(
      clients.map(async (c) => ({
        ...c,
        sex: c.sex as UserSex,
        status: c.status as UserStatus,
        avatar: c.avatar ? await FileRepository.findOneBy({ id: c.avatar }) : undefined,
        trainer: c.trainer ? await UserRepository.findOneBy({ id: c.trainer }) : undefined,
      })),
    );
    await ClientRepository.save(mappedClients);

    await fse.ensureDir(resultFolder);
    await fse.copy(seedsFolder, resultFolder);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await fse.ensureDir(resultFolder);
    await fse.remove(resultFolder);
    await queryRunner.query(`TRUNCATE TABLE "Files" CASCADE;
      TRUNCATE TABLE "Roles" CASCADE;
      TRUNCATE TABLE "Schedules" CASCADE;
      TRUNCATE TABLE "Sessions" CASCADE;
      TRUNCATE TABLE "Clients" CASCADE;
      TRUNCATE TABLE "Equipments" CASCADE;
      TRUNCATE TABLE "Users" CASCADE;`);
  }
}
