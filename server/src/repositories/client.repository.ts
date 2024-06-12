import database from 'database';
import ClientModel from '../models/client';

const ClientRepository = database.getRepository(ClientModel);

export default ClientRepository;
