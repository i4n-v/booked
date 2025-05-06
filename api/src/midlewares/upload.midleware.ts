import multer from 'multer';
import 'dotenv/config';

export const uploadIdentifierError = 'UPLOAD ERROR:';

function uploadMidleware() {
  const allowedFileMimes = ['application/pdf'];
  const allowedImageMimes = ['image/jpg', 'image/jpeg', 'image/pjpeg', 'image/png', 'image/webp'];

  const multerInstance = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 45 * 1024 * 1024,
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
