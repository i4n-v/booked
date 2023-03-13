import express from 'express';
import 'dotenv/config';
import routes from './routes';
import sequelizeConnection from './config/sequelizeConnection.config';

async function initApp() {
  const app = express();

  app.use(express.json());
  app.use(routes);

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
