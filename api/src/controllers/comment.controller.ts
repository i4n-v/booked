import { NextFunction, Request, Response } from 'express';
import CommentRepository from '../repositories/comment.repository';
import messages from '../config/messages.config';
import CommentCreateDto from '../dto/comment/commentCreate.dto';
import CommentUpdateDto from '../dto/comment/commentUpdate.dto';
import paginationWrapper from '../utils/paginationWrapper';

class CommentController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const { query } = request;
      const page = query.page ? parseInt(query.page as unknown as string) : 1;
      const limit = query.limit ? parseInt(query.limit as unknown as string) : 75;
      const { book_id, comment_id } = query;
      const whereStatement: any = {};

      if (book_id) {
        whereStatement['book_id'] = book_id;
      }

      if (comment_id) {
        whereStatement['refered_by'] = comment_id;
      }

      console.log(whereStatement);

      const comments = await CommentRepository.findAndCountAll(page, limit, whereStatement);

      const wrappedComments = paginationWrapper(comments, page, limit);

      return response.json(wrappedComments);
    } catch (error) {
      next(error);
    }
  }

  async store(request: Request, response: Response, next: NextFunction) {
    try {
      const { auth, body } = request;
      const { book_id, comment_id, description }: CommentCreateDto = body;

      if (!book_id && !comment_id) {
        return response
          .status(400)
          .json({ message: 'O identificador do livro ou comementário deve ser fornecido.' });
      }

      if (book_id && comment_id) {
        return response
          .status(400)
          .json({ message: 'Apenas um identificador deve ser fornecido.' });
      }

      if (!description) {
        return response.status(400).json({ message: 'A descrição do comentário é obrigatória.' });
      }

      await CommentRepository.create({
        user_id: auth.id,
        book_id,
        refered_by: comment_id,
        description,
      });

      return response.json({ message: messages.create('Comentário') });
    } catch (error) {
      next(error);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const {
        auth,
        body,
        params: { id },
      } = request;
      const { description }: CommentUpdateDto = body;

      const comment = await CommentRepository.findById(id);

      if (!comment) {
        return response.status(404).json({ message: messages.unknown('Comentário') });
      }

      if (comment.user_id !== auth.id) {
        return response.status(401).json({
          message: messages.unauthorized(),
        });
      }

      if (!description) {
        return response.status(400).json({ message: 'A descrição do comentário é obrigatória.' });
      }

      await CommentRepository.update(id, {
        description,
      });

      return response.json({ message: messages.update('Comentário') });
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

      const comment = await CommentRepository.findById(id);

      if (!comment) {
        return response.status(404).json({ message: messages.unknown('Comentário') });
      }

      if (comment.user_id !== auth.id) {
        return response.status(401).json({
          message: messages.unauthorized(),
        });
      }

      const isDeleted = await CommentRepository.deleteById(id);

      if (!isDeleted) {
        return response.status(400).json({ message: 'Não foi possível excluir o comentário.' });
      }

      return response.json({ message: messages.delete('Comentário') });
    } catch (error) {
      next(error);
    }
  }
}

export default new CommentController();
