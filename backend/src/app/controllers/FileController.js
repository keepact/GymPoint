import FileService from '../services/FileService';

class FileController {
  async store(req, res) {
    const { originalname, filename } = req.file;

    const result = await new FileService().store(originalname, filename);

    return res.status(result ? 200 : 400).json(result);
  }
}

export default new FileController();
