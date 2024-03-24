import express from 'express';
import 'express-async-errors'
import { errors } from 'celebrate';
import SwaggerUi from 'swagger-ui-express'
import SwaggerFile from '../../../swagger.json'
import router from './routes';
import { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { AppError } from './errors/AppError';
import { loadEnv } from '../../../config/env.config';

loadEnv();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(SwaggerFile))
app.use(router);
app.use(errors());
app.use((err: Error, request: Request, response: Response, next: NextFunction)=>{

    if(err instanceof AppError){
      return response.status(err.statusCode).json({
        message: err.message
      });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`
    })

  })

export default app;
