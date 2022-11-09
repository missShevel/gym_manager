import database from 'database';
import UserModel from '../models/model';

const userRepository = database.getRepository(UserModel);

export default userRepository;
