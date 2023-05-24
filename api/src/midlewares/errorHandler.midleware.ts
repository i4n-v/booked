/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { uploadIdentifierError } from './upload.midleware';

function errorHandlerMidleWare(
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const sequelizeErrors = [
    'SequelizeUniqueConstraintError',
    'SequelizeValidationError',
    'SequelizeForeignKeyConstraintError',
  ];

  if (sequelizeErrors.includes(error.name)) {
    response.status(400).json({
      message: error.errors[0].message,
    });
  }

  if (error.message.includes(uploadIdentifierError)) {
    response.status(400).json({
      message: error.message.replace(uploadIdentifierError, ''),
    });
  }

  console.log('❗ ERROR HANDLER: ', error);
  response.status(500).json({ message: 'Erro interno do servidor.' });
}

export default errorHandlerMidleWare;
