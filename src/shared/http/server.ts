import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import ErrorHandlerMiddleware from '@shared/middlewares/ErrorHandlerMiddleware';
import { AppDataSource } from '@shared/typeorm/data-source';

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(cors());
    app.use(express.json());

    app.use(routes);

    // Depois de lançar as rotas, chamo o middleware para pegar os erros.
    app.use(ErrorHandlerMiddleware.HandleError);

    console.log('Connected to database!');

    app.listen(3333, () => {
      console.log('Server runing on port 3333!');
    });
  })
  .catch(error => console.log(error));
