import 'dotenv/config';
import { Dialect } from 'sequelize';
import { IDatabaseConfig } from '../interfaces/databaseConfig.interface';

const databaseConfig: IDatabaseConfig = {
  development: {
    username: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
    host: process.env.DEV_DB_HOST,
    port: process.env.DEV_DB_PORT as unknown as number,
    dialect: process.env.DEV_DB_DIALECT as Dialect,
  },
  test: {
    username: process.env.TEST_DB_USER,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_NAME,
    host: process.env.TEST_DB_HOST,
    port: process.env.TEST_DB_PORT as unknown as number,
    dialect: process.env.TEST_DB_DIALECT as Dialect,
  },
  production: {
    username: process.env.PROD_DB_USER,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOST,
    port: process.env.ṔROD_DB_PORT as unknown as number,
    dialect: process.env.PROD_DB_DIALECT as Dialect,
  },
};

module.exports = databaseConfig;
