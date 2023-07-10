import 'dotenv/config';
import express from 'express';
import { syncConnection } from './config/sequelizeConnection.config';
import errorHandlerMidleWare from './midlewares/errorHandler.midleware';
import routes from './routes/';
import swagger from './config/swagger.config';
import cors from 'cors';

async function initApp() {
  const app = express();

  app.use(express.json());
  // app.use(cors());
  app.use('/public', express.static('public'));
  swagger(app);
  routes(app);
  app.use(errorHandlerMidleWare);

  try {
    await syncConnection();

    app.listen(process.env.APP_PORT, () => {
      console.log(`🔥 Server started at http://localhost:${process.env.APP_PORT}`);
      console.log(`📚 Access api documentation: http://localhost:${process.env.APP_PORT}/api-docs`);
    });
  } catch (error) {
    console.log('❗ The server cannot be started');
  }
}

initApp();
