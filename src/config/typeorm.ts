import { DataSource } from "typeorm";

export const MongoClient = new DataSource({
  type: 'mongodb',
  url: `mongodb://localhost:27017/sb_group_database`,
  database: 'sb_group_database',
  // entities: ['./src/modules/*/infra/typeorm/entities/.{ts,js}'],
  //entities: [Metadata, ProcessedData],
  logging: false,
  //readPreference: 'secondary',
  directConnection: true,
});
