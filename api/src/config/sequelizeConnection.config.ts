import { Sequelize } from 'sequelize-typescript';
import 'dotenv/config';
import databaseConfig from './database.config';

import models from '../database/models';

const sequelizeConnection = async () => {
  let config;

  switch (process.env.NODE_ENV) {
    case 'DEVELOPMENT':
      config = databaseConfig.development;
      break;
    case 'TEST':
      config = databaseConfig.test;
      break;
    case 'PRODUCTION':
      config = databaseConfig.production;
      break;
    default:
      config = databaseConfig.development;
      break;
  }

  config.logging = console.log;

  const sequelize = new Sequelize(config);

  try {
    sequelize.addModels(models);

    await sequelize.sync({
      force: process.env.RESET_DB_TABLES === 'true',
    });

    console.log('Connection has been established successfully');
    return sequelize;
  } catch (error: any) {
    console.error('Unable to connect to the database:', error);
    throw new Error(error.message);
  }
};

export default sequelizeConnection;
