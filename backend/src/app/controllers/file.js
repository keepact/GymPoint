import FileRepository from '../repositories/File';

class FileController {
  async store(req, res) {
    const { originalname, filename } = req.file;

    const result = await new FileRepository().create(originalname, filename);

    return res.status(result ? 200 : 400).json(result);
  }
}

export default new FileController();
