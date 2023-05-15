import { Sequelize } from 'sequelize-typescript';
import 'dotenv/config';
import databaseConfig from './database.config';

import models from '../database/models';

function createSequelizeConnection() {
  let config;

  switch (process.env.NODE_ENV) {
    case 'development':
      config = databaseConfig.development;
      break;
    case 'test':
      config = databaseConfig.test;
      break;
    case 'production':
      config = databaseConfig.production;
      break;
    default:
      config = databaseConfig.development;
      break;
  }

  config.logging = process.env.LOG_DB_QUERIES === 'true' ? console.log : undefined;
  config.repositoryMode = true;

  const sequelize = new Sequelize(config);

  sequelize.addModels(models);

  return sequelize;
}

const sequelizeConnection = createSequelizeConnection();

async function syncConnection() {
  try {
    await sequelizeConnection.authenticate();
    sequelizeConnection.sync({ force: process.env.RESET_DB_TABLES === 'true' });

    console.log('✅ Connection has been established successfully');
  } catch (error: any) {
    console.error('❌ Unable to connect to the database:', error);
    throw new Error(error.message);
  }
}

export { sequelizeConnection, syncConnection };
