import ApiError from 'helpers/ApiError';
import FileRepository from '../repositories/file.repository';

interface IUploadFile {
  id?: string;
  name: string;
  extention: string;
}

export default class FileService {
  private repository = FileRepository;

  public create(data: IUploadFile) {
    return this.repository.save(data);
  }

  public findById(id: string | null) {
    if (id === null) throw new ApiError('Not found', 400);

    return this.repository.findOneByOrFail({
      id,
    });
  }
}
