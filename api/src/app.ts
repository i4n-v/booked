import 'dotenv/config';
import { syncConnection } from './config/sequelizeConnection.config';
import { httpServer } from './setup';
import initSocketEvents from './events';

async function initApp() {
  try {
    await syncConnection();

    initSocketEvents();

    httpServer.listen(process.env.APP_PORT, () => {
      console.log(`🔥 Server started at http://localhost:${process.env.APP_PORT}`);
      console.log(`📚 Access api documentation: http://localhost:${process.env.APP_PORT}/api-docs`);
    });
  } catch (error) {
    console.log('❗ The server cannot be started');
  }
}

initApp();
