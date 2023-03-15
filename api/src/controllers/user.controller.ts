import { Request, Response } from 'express';
import UserRepository from '../repositories/user.repository';
import UserCreateDto from '../dto/user/userCreate.dto';

class UserController {
  async store(request: Request, response: Response) {
    const userCreateDto: UserCreateDto = request.body;

    if (!userCreateDto.email) {
      return response.status(400).json({
        message: 'E-mail inválido.',
      });
    }

    if (userCreateDto.password !== userCreateDto.confirm_password) {
      return response.status(400).json({
        message: 'As senhas não coincidem.',
      });
    }

    await UserRepository.create(userCreateDto);

    response.json({
      message: 'Usuário cadastrado com sucesso.',
    });
  }
}

const userController = new UserController();

export default userController;
