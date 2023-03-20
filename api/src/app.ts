import 'dotenv/config';
import express from 'express';
import sequelizeConnection from './config/sequelizeConnection.config';
import errorHandlerMidleWare from './midlewares/errorHandler.midleware';
import initRoutes from './routes/init.routes';

async function initApp() {
  const app = express();

  app.use(express.json());
  initRoutes(app);
  app.use(errorHandlerMidleWare);

  try {
    await sequelizeConnection();

    app.listen(process.env.APP_PORT, () =>
      console.log(`🔥 Server started at http://localhost:${process.env.APP_PORT}`)
    );
  } catch (error) {
    console.log('The server cannot be started');
  }
}

initApp();
