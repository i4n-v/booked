/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';

function errorHandlerMidleWare(
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (error.name === 'SequelizeValidationError') {
    response.status(400).json({
      message: error.errors[0].message,
    });
  }

  console.log('❗ ERROR HANDLER: ', error);
  response.status(500).json({ message: 'Erro interno do servidor.' });
}

export default errorHandlerMidleWare;
