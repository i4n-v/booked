import { NextFunction, Request, Response } from 'express';
import BookRepository from '../repositories/book.repository';
import WisheRepository from '../repositories/wishe.repository';
import messages from '../config/messages.config';
import paginationWrapper from '../utils/paginationWrapper';

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

  async index(request: Request, response: Response, next: NextFunction) {
    try {
      // Desestruturação dos objetos de request
      const { auth, query } = request;

      // Parse dos parâmetros da URL para paginação
      const page = query.page ? parseInt(query.page as unknown as string) : 1;
      const limit = query.limit ? parseInt(query.limit as unknown as string) : 75;

      // Consulta ao banco de dados para listar todos os livros
      const books = await BookRepository.findAndCountAll(page, limit, request, {});

      // Paginação dos resultados
      const wrappedBooks = paginationWrapper(books, page, limit);

      // Retorna os resultados em formato JSON
      return response.json(wrappedBooks);
    } catch (error) {
      // Em caso de erro, chama a próxima função de middleware de tratamento de erros (Express.js)
      next(error);
    }
  }
}

export default new WisheController();
