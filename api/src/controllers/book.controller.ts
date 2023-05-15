import { NextFunction, Request, Response } from 'express';
import { fileSystem } from '../utils';
import messages from '../config/messages.config';
import BookRepository from '../repositories/book.repository';
import BookCreateDto from '../dto/book/bookCreate.dto';

interface MulterUploadedFiles {
  photo?: Express.Multer.File[];
  file?: Express.Multer.File[];
}

class BookController {
  async store(request: Request, response: Response, next: NextFunction) {
    try {
      const { auth, body } = request;
      const files = request.files as unknown as MulterUploadedFiles;
      const { name, price, description, user_id }: BookCreateDto = body;
      let file_url;
      let photo_url;

      if (user_id !== auth.id) {
        if (files?.photo) await fileSystem.removeFile(files.photo[0].path);
        if (files?.file) await fileSystem.removeFile(files.file[0].path);

        return response.status(401).json({
          message: messages.unauthorized(),
        });
      }

      if (files?.['photo']) photo_url = fileSystem.filePathToUpload(files.photo[0].path);

      if (files?.['file']) {
        file_url = fileSystem.filePathToUpload(files.file[0].path);
      } else {
        return response.status(400).json({
          message: 'O arquivo do livro é obrigatório.',
        });
      }

      await BookRepository.create({
        user_id,
        name,
        price,
        description,
        photo_url,
        file_url,
      });

      return response.json({
        message: messages.create('Livro'),
      });
    } catch (error) {
      next(error);
    }
  }

  async show(request: Request, response: Response, next: NextFunction) {
    try {
      console.log();
    } catch (error) {
      next(error);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      console.log();
    } catch (error) {
      next(error);
    }
  }
}

export default new BookController();
