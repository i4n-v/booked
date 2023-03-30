import { NextFunction, Request, Response } from 'express';
import UserRepository from '../repositories/user.repository';
import UserCreateDto from '../dto/user/userCreate.dto';
import messages from '../config/messages.config';

class UserController {
  async store(request: Request, response: Response, next: NextFunction) {
    try {
      const userData: UserCreateDto = request.body;

      if (userData.password !== userData.confirm_password) {
        return response.status(400).json({
          message: 'As senhas não coincidem.',
        });
      }

      await UserRepository.create(userData);

      response.json({
        message: messages.create('Usuário'),
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
