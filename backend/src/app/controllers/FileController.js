import File from '../models/File';

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path,
    });

    if (!file.name || !file.path) {
      return res
        .status(400)
        .json({ error: 'Arquivo corrompido, tente novamente com outra foto' });
    }

    return res.json(file);
  }
}

export default new FileController();
