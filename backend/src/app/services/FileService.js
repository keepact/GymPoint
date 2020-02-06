import File from '../models/File';

class FileController {
  async store(name, path) {
    try {
      const file = await File.create({
        name,
        path,
      });

      if (!file.name || !file.path) {
        console.error('Arquivo corrompido, tente novamente com outra foto');
      }

      return file;
    } catch (err) {
      console.error(
        `Não foi possível realizar o upload: `,
        err.response.data.error
      );
    }
    return undefined;
  }
}

export default FileController;
