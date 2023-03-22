import { NextFunction, Request, Response } from 'express';
import UserRepository from '../repositories/user.repository';
import UserCreateDto from '../dto/user/userCreate.dto';

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
        message: 'Usuário cadastrado com sucesso.',
      });
    } catch (error) {
      next(error);
    }
  }
}

const userController = new UserController();

export default userController;
