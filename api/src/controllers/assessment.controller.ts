import { NextFunction, Request, Response } from 'express';
import messages from '../config/messages.config';
import AssessmentCreateDto from '../dto/assessment/assessmentCreate.dto';
import AssessmentRepository from '../repositories/assessment.repository';
import AssessmentUpdateDto from '../dto/assessment/assessmentUpdate.dto';

class AssessmentController {
  async store(request: Request, response: Response, next: NextFunction) {
    try {
      const { auth, body } = request;
      const { book_id, number }: AssessmentCreateDto = body;

      if (!book_id) {
        return response
          .status(400)
          .json({ message: 'O identificador do livro deve ser fornecido.' });
      }

      if (!number) {
        return response.status(400).json({ message: 'O número da avaliação é obrigatória.' });
      }

      await AssessmentRepository.create({
        user_id: auth.id,
        book_id,
        number,
      });

      return response.json({ message: messages.create('Avaliação') });
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
      const { number }: AssessmentUpdateDto = body;

      const assessment = await AssessmentRepository.findById(id);

      if (!assessment) {
        return response.status(404).json({ message: messages.unknown('Avaliação') });
      }

      if (assessment.user_id !== auth.id) {
        return response.status(401).json({
          message: messages.unauthorized(),
        });
      }

      if (!number) {
        return response.status(400).json({ message: 'O número da avaliação é obrigatória.' });
      }

      await AssessmentRepository.update(id, {
        number,
      });

      return response.json({ message: messages.update('Avaliação') });
    } catch (error) {
      next(error);
    }
  }
}

export default new AssessmentController();
