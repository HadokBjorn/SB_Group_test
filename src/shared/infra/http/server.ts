import { MongoClient } from '../../../config/typeorm';
import app from './app';


const PORT = 5000

const initializeDataSources = async () => {
  await MongoClient.initialize();
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
