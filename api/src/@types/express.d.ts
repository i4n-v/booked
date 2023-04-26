import IAuth from '../interfaces/auth.interface';

declare global {
  namespace Express {
    export interface Request {
      auth: IAuth;
    }
  }
}
