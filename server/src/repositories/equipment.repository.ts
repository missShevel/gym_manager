import database from 'database';
import EquipmentModel from '../models/equipment';

const EquipmentRepository = database.getRepository(EquipmentModel);

export default EquipmentRepository;
