import File from '../models/File';

class FileRepository {
  async create(name, path) {
    try {
      return await File.create({
        name,
        path,
      });
    } catch (err) {
      console.error(`Não foi possível realizar o upload: `, err);
    }
    return undefined;
  }
}

export default FileRepository;
