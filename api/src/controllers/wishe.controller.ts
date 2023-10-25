import { NextFunction, Request, Response } from 'express';
import BookRepository from '../repositories/book.repository';
import WisheRepository from '../repositories/wishe.repository';
import messages from '../config/messages.config';

class WisheController {
  async store(request: Request, response: Response, next: NextFunction) {
    try {
      const { auth, params } = request;
      const bookId = params.id;

      const book = await BookRepository.findById(bookId);

      if (!book) {
        return response.status(404).json({ message: messages.unknown('Livro') });
      }

      await WisheRepository.create({
        user_id: auth.id,
        book_id: bookId,
      });

      return response.json({ message: 'Livro favoritado com sucesso!' });
    } catch (error) {
      next(error);
    }
  }
}

export default new WisheController();
