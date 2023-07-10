import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';

function httpsMidleware(error: any, request: Request, response: Response, next: NextFunction) {
  const {
    url,
    protocol,
    headers: { host },
  } = request;

  if (protocol === 'http' && process.env.NODE_ENV !== 'development') {
    return response.redirect(301, `https://${host}${url}`);
  }

  next();
}

export default httpsMidleware;
