import { NextFunction, Request, Response } from 'express';
import UserRepository from '../repositories/user.repository';
import UserCreateDto from '../dto/user/userCreate.dto';
import UserUpdateDto from '../dto/user/userUpdate.dto';
import messages from '../config/messages.config';
import { encrypt, fileSystem } from '../utils';
import userUpdatePasswordDto from '../dto/user/userUpdatePassword.dto';

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

  async show(request: Request, response: Response, next: NextFunction) {
    try {
      const {
        auth,
        params: { id },
      } = request;

      if (id !== auth.id) {
        return response.status(400).json({
          message: messages.unauthorized(),
        });
      }

      const user = await UserRepository.findById(id);

      if (!user) {
        return response.status(400).json({
          message: messages.unknown('Usuário'),
        });
      }

      if (user.photo_url) user.photo_url = fileSystem.uploadedFilePath(request, user.photo_url);

      return response.json(user);
    } catch (error) {
      next(error);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const { params, body, file, auth } = request;
      const id = params.id;
      const { name, email, user_name, birth_date, description, photo }: UserUpdateDto = body;
      let photo_url;
      let emailToUpdate;

      if (id !== auth.id) {
        if (file) await fileSystem.removeFile(file.path);

        return response.status(401).json({
          message: messages.unauthorized(),
        });
      }

      if (photo === null) photo_url = null;

      const user = await UserRepository.findById(id);

      if (!user) {
        return response.status(404).json({
          message: messages.unknown('Usuário'),
        });
      }

      if (file) {
        if (user.photo_url) fileSystem.removeFile(__dirname + '/../..' + user.photo_url);

        photo_url = fileSystem.filePathToUpload(file.path);
      }

      if (user.email === email) emailToUpdate = email;

      await UserRepository.update(id, {
        name,
        email: emailToUpdate,
        user_name,
        birth_date,
        description,
        photo_url,
      });

      return response.json({
        message: messages.update(),
      });
    } catch (error) {
      next(error);
    }
  }

  async changePassword(request: Request, response: Response, next: NextFunction) {
    try {
      const { body, params, auth } = request;
      const id = params.id;
      const { previous_password, password, confirm_password }: userUpdatePasswordDto = body;

      if (id !== auth.id) {
        return response.status(401).json({
          message: messages.unauthorized(),
        });
      }

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

      const pastPasswordIsValid = await encrypt.compare(user.password, previous_password);

      if (!pastPasswordIsValid) {
        return response.status(400).json({
          message: 'Senha anterior inválida.',
        });
      }

      const actualPasswordIsNotValid = await encrypt.compare(user.password, password);

      if (actualPasswordIsNotValid) {
        return response.status(400).json({
          message: 'A senha atual não pode ser igual a anterior.',
        });
      }

      await UserRepository.update(id, { password });

      response.json({
        message: messages.update(),
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
