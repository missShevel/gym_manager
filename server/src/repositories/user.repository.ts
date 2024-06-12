import database from 'database';
import UserModel from '../models/user';

const UserRepository = database.getRepository(UserModel);

export default UserRepository;
