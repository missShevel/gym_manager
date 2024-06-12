import database from 'database';
import FileModel from '../models/file';

const FileRepository = database.getRepository(FileModel);

export default FileRepository;
