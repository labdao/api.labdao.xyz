import { DataSource } from 'typeorm';

let entitiesPath: string;
const dbConfig = {
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

if (process.env.NODE_ENV == 'production') {
  entitiesPath = '/../**/*.entity.js';
} else {
  import('dotenv').then((dotenv) => {
    dotenv.config();
    dbConfig.host = process.env.DB_HOST;
    dbConfig.username = process.env.DB_USERNAME;
    dbConfig.password = process.env.DB_PASSWORD;
    dbConfig.database = process.env.DB_NAME;
  });
  entitiesPath = '/../**/*.entity.{js,ts}';
}

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: dbConfig.host,
  port: 5432,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  synchronize: false,
  logging: false,
  entities: [__dirname + entitiesPath],
  migrations: ['src/migrations/*.ts'],
});
