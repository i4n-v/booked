import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import UserRepository from '../repositories/user.repository';
import { encrypt } from '../utils';
import messages from '../config/messages.config';
import jwt from 'jsonwebtoken';
import AuthenticationRepository from '../repositories/authentication.repository';
import { add, hoursToSeconds } from 'date-fns';
import authenticationRepository from '../repositories/authentication.repository';

class AuthenticationController {
  async authenticate(request: Request, response: Response, next: NextFunction) {
    try {
      const userData = request.body;

      if (!userData.user_login) {
        return response.status(400).json({ message: 'Nome de usuário ou e-mail são requeridos.' });
      }

      if (!userData.password) return response.status(400).json({ messages: 'Senha requerida.' });

      const user = await UserRepository.findByCredentials(userData.user_login || null, request);

      if (!user) return response.status(404).json({ message: messages.unknown('Usuário') });

      const isValidPassword = await encrypt.compare(user.password, userData.password);

      if (!isValidPassword) {
        return response.status(401).json({ message: 'Usuário ou senha inválidos.' });
      }

      const { id, user_name, email, photo_url } = user;

      const findedToken = await AuthenticationRepository.findByUserId(id);

      if (findedToken) {
        await AuthenticationRepository.updateByToken(findedToken.token, { valid: false });
      }

      const token = jwt.sign({ id, user_name, email }, process.env.JWT_PRIVATE_KEY as string, {
        expiresIn: hoursToSeconds(24),
      });

      const expiryDate = add(new Date(), {
        hours: 24,
      });

      await AuthenticationRepository.create({ token, user_id: id, expiry_date: expiryDate });

      response.json({
        id,
        user_name,
        email,
        token,
        photo_url,
      });
    } catch (error) {
      next(error);
    }
  }

  async verify(request: Request, response: Response, next: NextFunction) {
    try {
      return response.json({ message: 'Token válido', valid: true });
    } catch (error) {
      next(error);
    }
  }

  async logout(request: Request, response: Response, next: NextFunction) {
    try {
      const { auth } = request;

      await authenticationRepository.updateByUserId(auth.id, {
        valid: false,
      });

      return response.json({ message: 'Logout realizado com sucesso.' });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthenticationController();
