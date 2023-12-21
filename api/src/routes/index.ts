import { Express, Router } from 'express';
import appRoutes from './app.routes';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';
import BookRouter from './book.routes';
import CategoryRouter from './category.routes';
import CommentRouter from './comment.routes';
import AssessmentRouter from './assessment.routes';
import AcquisitionRouter from './acquisition.routes';
import ChatRouter from './chat.routes';
import MessageRouter from './message.routes';
import WisheRouter from './wishe.routes';
import SolicitationRouter from './solicitation.routes';
import FollowerRoutes from './follower.routes';

const routes: Router[] = [
  appRoutes,
  userRoutes,
  authRoutes,
  BookRouter,
  CategoryRouter,
  CommentRouter,
  AssessmentRouter,
  AcquisitionRouter,
  ChatRouter,
  MessageRouter,
  WisheRouter,
  SolicitationRouter,
  FollowerRoutes,
];

export default function initRoutes(app: Express) {
  try {
    routes.forEach((route) => {
      app.use(route);
    });
  } catch (error: any) {
    console.log('❗ Routes could not be initialized', error);
  }
}
