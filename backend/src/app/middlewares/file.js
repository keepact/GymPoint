export default async function uploadFile(req, res, next) {
  try {
    const { name, path } = req.file;

    if (!name || !path) {
      console.error('Arquivo corrompido, tente novamente com outra foto');
    }

    return next();
  } catch (error) {
    return res.status(400).json({
      error: 'Houve no envio da image, tente novamente em alguns minutos',
      messsages: error.inner,
    });
  }
}
