import { NextFunction, Request, Response } from 'express';
import UserRepository from '../repositories/user.repository';
import UserCreateDto from '../dto/user/userCreate.dto';
import UserUpdateDto from '../dto/user/userUpdate.dto';
import messages from '../config/messages.config';
import { encrypt } from '../utils';

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

  async changePassword(request: Request, response: Response, next: NextFunction) {
    try {
      const { body, params } = request;
      const id = params.id;
      const { previous_password, password, confirm_password }: UserUpdateDto = body;

      if (!previous_password || !password || !confirm_password) {
        return response.status(400).json({
          message: 'As credenciais são obrigatórias.',
        });
      }

      if (password !== confirm_password) {
        return response.status(400).json({
          message: 'As senhas não coincidem.',
        });
      }

      const user = await UserRepository.findById(id);

      if (!user) {
        return response.status(404).json({
          message: messages.unknown('Usuário'),
        });
      }

      const pastPasswordIsValid = await encrypt.compare(
        user.password,
        previous_password,
        user.salt
      );

      if (!pastPasswordIsValid) {
        return response.status(400).json({
          message: 'Senha anterior inválida.',
        });
      }

      const actualPasswordIsNotValid = await encrypt.compare(user.password, password, user.salt);

      if (actualPasswordIsNotValid) {
        return response.status(400).json({
          message: 'A senha atual não pode ser igual a anterior.',
        });
      }

      await UserRepository.update(id, { password });

      response.json({
        message: messages.update('Dados'),
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
