import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Auth from '../interfaces/auth.interface';
import AuthenticationRepository from '../repositories/authentication.repository';

async function optionalAuthMidleware(request: Request, response: Response, next: NextFunction) {
  const token = request.headers['x-access-token'];

  if (!token) return next();

  try {
    const findedToken = await AuthenticationRepository.findByToken(token as string);

    if (!findedToken) return next();

    if (!findedToken.valid) {
      return next();
    }

    const authData = jwt.verify(token as string, process.env.JWT_PRIVATE_KEY as string);
    const { id, user_name, email } = authData as Auth;

    request.auth = {
      id,
      user_name,
      email,
    };

    return next();
  } catch (error) {
    return next();
  }
}

export default optionalAuthMidleware;
