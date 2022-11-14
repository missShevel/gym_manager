import database from 'database';
import RoleModel from '../models/role';

const RoleRepository = database.getRepository(RoleModel);

export default RoleRepository;
