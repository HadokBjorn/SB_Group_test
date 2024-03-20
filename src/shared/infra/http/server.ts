import 'reflect-metadata'
import '../../container/index';
import { AppDataSource } from '../../../config/typeorm';
import app from './app';


const PORT = 5000

const initializeDataSources = async () => {
  await AppDataSource.initialize();
};

initializeDataSources()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Project running in port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error during Database initialization', err);
  });
