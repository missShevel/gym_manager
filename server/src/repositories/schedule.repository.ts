import database from 'database';
import ScheduleModel from '../models/schedule';

const ScheduleRepository = database.getRepository(ScheduleModel);

export default ScheduleRepository;
