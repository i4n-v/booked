/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';

function errorHandlerMidleWare(
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) {
  console.log(error);
  response.sendStatus(500);
}

export default errorHandlerMidleWare;
