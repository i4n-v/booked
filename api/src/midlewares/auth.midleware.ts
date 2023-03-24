import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Auth from '../interfaces/auth.interface';
import AuthenticationRepository from '../repositories/authentication.repositoryl';

async function authMidleware(request: Request, response: Response, next: NextFunction) {
  const token = request.headers['x-access-token'];

  if (!token) return response.status(401).json({ message: 'Conexão não autorizada.' });

  try {
    const findedToken = await AuthenticationRepository.findByToken(token as string);

    if (!findedToken) return response.status(401).json({ message: 'Conexão não autorizada.' });

    if (!findedToken.valid) return response.status(401).json({ message: 'Token inválido.' });

    const authData = jwt.verify(token as string, process.env.JWT_PRIVATE_KEY as string);
    const { id, user_name, email } = authData as Auth;

    request.auth = {
      id,
      user_name,
      email,
    };

    return next();
  } catch (error) {
    try {
      await AuthenticationRepository.updateByToken(token as string, { valid: false });
    } catch (error) {
      return next(error);
    }

    return response.status(401).json({ message: 'Token inválido.' });
  }
}

export default authMidleware;
