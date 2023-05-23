import { Express } from 'express';
import { Router } from 'express';
import appRoutes from './app.routes';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';
import BookRouter from './book.routes';
import CategoryRouter from './category.routes';

const routes: Router[] = [appRoutes, userRoutes, authRoutes, BookRouter, CategoryRouter];

export default function initRoutes(app: Express) {
  try {
    routes.forEach((route) => {
      app.use(route);
    });
  } catch (error: any) {
    console.log('❗ Routes could not be initialized', error);
  }
}
