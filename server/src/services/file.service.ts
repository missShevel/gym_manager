import FileRepository from '../repositories/file.repository';

export default class FileService {
  private repository = FileRepository;

  public create(data: any) {
    return this.repository.save(data);
  }

  public findById(id: string) {
    return this.repository.findOneBy({
      id,
    });
  }
}
