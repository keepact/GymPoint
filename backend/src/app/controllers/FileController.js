import File from '../models/File';

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path,
    });

    if (!file) {
      return res.status(400).json({ error: 'Arquivo não encontrado' });
    }

    return res.json(file);
  }
}

export default new FileController();
