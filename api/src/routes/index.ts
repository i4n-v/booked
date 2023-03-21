import { Router } from 'express';
import appRoutes from './app.routes';
import userRoutes from './user.routes';

const routes: Router[] = [appRoutes, userRoutes];

export default routes;
