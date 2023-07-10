import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import 'dotenv/config';

export const uploadIdentifierError = 'UPLOAD ERROR:';

function uploadMidleware() {
  const allowedFileMimes = ['application/pdf'];
  const allowedImageMimes = ['image/jpg', 'image/jpeg', 'image/pjpeg', 'image/png', 'image/webp'];

  const multerInstance = multer({
    storage: multer.diskStorage({
      destination: (request, file, callback) => {
        if (allowedFileMimes.includes(file.mimetype)) {
          if (process.env.NODE_ENV !== 'development') {
            callback(null, path.resolve(__dirname, '..', 'public', 'uploads', 'files'));
          } else {
            callback(null, path.resolve(__dirname, '..', '..', 'public', 'uploads', 'files'));
          }
        } else if (allowedImageMimes.includes(file.mimetype)) {
          if (process.env.NODE_ENV !== 'development') {
            callback(null, path.resolve(__dirname, '..', 'public', 'uploads', 'images'));
          } else {
            callback(null, path.resolve(__dirname, '..', '..', 'public', 'uploads', 'images'));
          }
        }
      },
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
      fileSize: 10 * 1024 * 1024 * 1024,
    },
    fileFilter: (request, file, callback) => {
      const allowedMimes = [...allowedFileMimes, ...allowedImageMimes];

      if (allowedMimes.includes(file.mimetype)) {
        callback(null, true);
      } else {
        callback(new Error(uploadIdentifierError + 'Formato de arquivo inválido.'));
      }
    },
  });

  return multerInstance;
}

export default uploadMidleware();
