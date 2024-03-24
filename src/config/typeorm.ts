import 'reflect-metadata';
import { DataSource } from "typeorm";
import { User } from '../modules/user/entities/User.entity';
import { loadEnv } from './env.config';

loadEnv()
export const AppDataSource = new DataSource({
  type: 'mongodb',
  url: `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`,
  database: process.env.MONGO_DATABASE,
  //entities: ['./src/modules/*/entities/.{ts,js}'],
  entities: [User],
  logging: false,
  directConnection: true,
});
