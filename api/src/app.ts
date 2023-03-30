import 'dotenv/config';
import express from 'express';
import { syncConnection } from './config/sequelizeConnection.config';
import errorHandlerMidleWare from './midlewares/errorHandler.midleware';
import initRoutes from './routes/init.routes';
import cors from 'cors';

async function initApp() {
  const app = express();

  app.use(express.json());
  app.use(cors());
  initRoutes(app);
  app.use(errorHandlerMidleWare);

  try {
    await syncConnection();

    app.listen(process.env.APP_PORT, () =>
      console.log(`🔥 Server started at http://localhost:${process.env.APP_PORT}`)
    );
  } catch (error) {
    console.log('❗ The server cannot be started');
  }
}

initApp();
