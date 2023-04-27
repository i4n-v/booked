import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

export const uploadIdentifierError = 'UPLOAD ERROR:';

function uploadMidleware(type: 'file' | 'image') {
  const uploadTypes = {
    file: {
      directory: 'files',
      size: Infinity,
      types: ['application/pdf'],
    },
    image: {
      directory: 'images',
      size: 512 * 1024 * 1024,
      types: ['image/jpeg', 'image/pjpeg', 'image/png', 'image/webp'],
    },
  };

  const destionationPath = path.resolve(
    __dirname,
    '..',
    '..',
    'public',
    'uploads',
    uploadTypes[type].directory
  );

  const multerInstance = multer({
    dest: destionationPath,
    storage: multer.diskStorage({
      destination: (request, file, callback) => callback(null, destionationPath),
      filename: (request, file, callback) => {
        crypto.randomBytes(16, (error, hash) => {
          if (error)
            callback(new Error(uploadIdentifierError + 'Erro ao salvar arquivo no sistema.'), '');

          const filename = `${hash.toString('hex')}-${file.originalname}`;
          callback(null, filename);
        });
      },
    }),
    limits: {
      fileSize: uploadTypes[type].size,
    },
    fileFilter: (request, file, callback) => {
      if (uploadTypes[type].types.includes(file.mimetype)) {
        callback(null, true);
      } else {
        callback(new Error(uploadIdentifierError + 'Formato de arquivo inválido.'));
      }
    },
  });

  return multerInstance;
}

export default uploadMidleware;
