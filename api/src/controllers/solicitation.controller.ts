import { NextFunction, Request, Response } from 'express';
import messages from '../config/messages.config';
import BookRepository from '../repositories/book.repository';
import { Op } from 'sequelize';
import { endOfDay, parseISO, startOfDay } from 'date-fns';
import paginationWrapper from '../utils/paginationWrapper';
import SolicitationUpdateDto from '../dto/solicitation/solicitationUpdate.dto';
import SolicitationRepository from '../repositories/solicitation.repository';
import { io } from '../setup';

class SolicitationController {
  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const { auth, params, body } = request;
      const solicitationId = params.id;
      const { status }: SolicitationUpdateDto = body;

      const solicitation = await SolicitationRepository.findById(solicitationId);

      if (!solicitation) {
        return response.status(404).json({ message: messages.unknown('Acquisição') });
      }

      const book = await BookRepository.findById(solicitation.book_id);

      if (!book) {
        return response.status(404).json({
          message: messages.unknown('Livro'),
        });
      }

      if (solicitation.user_id !== auth.id && book.user.id !== auth.id) {
        return response.status(401).json({
          message: messages.unauthorized(),
        });
      }

      if (status === 'pending') {
        return response.status(400).json({
          message: 'Não é possível mudar o status de uma solicitação para pendente.',
        });
      }

      if (book.user.id === auth.id && status === 'canceled') {
        return response.status(401).json({
          message: 'Não é possível cancelar uma solicitação recebida.',
        });
      }

      if (solicitation.user_id === auth.id && ['accepted', 'refused'].includes(status)) {
        return response.status(401).json({
          message: 'Não é possível aceitar ou recusar uma solicitação enviada.',
        });
      }

      await SolicitationRepository.update(solicitationId, {
        status,
      });

      const pendingSolicitations = await SolicitationRepository.countPendingsByReceiverId(
        book.user.id
      );

      io.emit(`pending-solicitations-${book.user.id}`, pendingSolicitations);

      return response.json({ message: messages.update('Aquisição') });
    } catch (error) {
      next(error);
    }
  }

  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const { auth, query } = request;
      const page = query.page ? parseInt(query.page as unknown as string) : 1;
      const limit = query.limit ? parseInt(query.limit as unknown as string) : 75;
      const { type, min_date, max_date, status } = query;

      const whereStatement: any = {};

      if (type === 'received') {
        whereStatement['$book->user.id$'] = auth.id;
      }

      if (type === 'sended') {
        whereStatement['$user.id$'] = auth.id;
      }

      if (min_date || max_date) {
        whereStatement['createdAt'] = {
          [Op.gte]: startOfDay(min_date ? parseISO(min_date as string) : new Date()),
          [Op.lte]: endOfDay(max_date ? parseISO(max_date as string) : new Date()),
        };
      }

      if (status) {
        whereStatement['status'] = {
          [Op.in]: Array.isArray(status) ? status : [status],
        };
      }

      const solicitations = await SolicitationRepository.findAndCountAll(
        page,
        limit,
        whereStatement
      );

      const wrappedSolicitations = paginationWrapper(solicitations, page, limit);

      return response.json(wrappedSolicitations);
    } catch (error) {
      next(error);
    }
  }
}

export default new SolicitationController();
