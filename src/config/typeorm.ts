import 'reflect-metadata';
import { DataSource } from "typeorm";
import { User } from '../modules/user/entities/User.entity';

export const AppDataSource = new DataSource({
  type: 'mongodb',
  url: `mongodb://localhost:27017/sb_group_database`,
  database: 'sb_group_database',
  //entities: ['./src/modules/*/entities/.{ts,js}'],
  entities: [User],
  logging: false,
  //readPreference: 'secondary',
  directConnection: true,
});
