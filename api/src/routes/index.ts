import { Router } from 'express';
import appRoutes from './app.routes';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';

const routes: Router[] = [appRoutes, userRoutes, authRoutes];

export default routes;
