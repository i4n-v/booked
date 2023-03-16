/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import {} from 'sequelize-typescript';

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

  console.log('ERROR HANDLER: ', error);
  response.sendStatus(500);
}

export default errorHandlerMidleWare;
