import { NextFunction, Request, Response } from 'express';
import { fileSystem } from '../utils';
import messages from '../config/messages.config';
import BookRepository from '../repositories/book.repository';
import BookCreateDto from '../dto/book/bookCreate.dto';
import paginationWrapper from '../utils/paginationWrapper';

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

  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const { query } = request;
      const page = query.page ? parseInt(query.page as unknown as string) : 1;
      const limit = query.page ? parseInt(query.limit as unknown as string) : 75;

      const books = await BookRepository.findAndCountAll(page, limit);

      const wrappedBooks = paginationWrapper(books, page, limit);

      return response.json(wrappedBooks);
    } catch (error) {
      next(error);
    }
  }

  async show(request: Request, response: Response, next: NextFunction) {
    try {
      const {
        params: { id },
      } = request;

      const book = await BookRepository.findById(id);

      if (!book) return response.status(404).json({ message: messages.unknown('Livro') });

      if (book.file_url) book.file_url = fileSystem.uploadedFilePath(request, book.file_url);

      return response.json(book);
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

  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      const {
        auth,
        params: { id },
      } = request;

      const book = await BookRepository.findById(id);

      if (!book) return response.status(404).json({ message: messages.unknown('Livro') });

      if (book.user.id !== auth.id) {
        return response.status(401).json({ message: messages.unauthorized() });
      }

      const isDeleted = await BookRepository.deleteById(id);

      if (!isDeleted) {
        return response.status(400).json({ message: 'Não foi possível excluir o livro.' });
      }

      const relativePath = __dirname + '/../..';

      if (book.photo_url) fileSystem.removeFile(relativePath + book.photo_url);

      if (book.file_url) fileSystem.removeFile(relativePath + book.file_url);

      return response.json({ message: 'Livro excluido com sucesso.' });
    } catch (error) {
      next(error);
    }
  }
}

export default new BookController();
