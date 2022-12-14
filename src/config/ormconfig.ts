import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: 5432,
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: ['src/migrations/*.ts'],
});
