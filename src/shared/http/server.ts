import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import ErrorHandlerMiddleware from '@shared/middlewares/ErrorHandlerMiddleware';
import { AppDataSource } from '@shared/typeorm/data-source';
import { errors } from 'celebrate';

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(cors());
    app.use(express.json());

    app.use(routes);

    // Usando o middleware do celebrate para que as validações dos esquemas sejam feitas.
    app.use(errors());

    // Depois de lançar as rotas, chamo o middleware para pegar os erros.
    app.use(ErrorHandlerMiddleware.HandleError);

    console.log('Connected to database!');

    app.listen(3333, () => {
      console.log('Server runing on port 3333!');
    });
  })
  .catch(error => {
    console.error('❌ Erro ao iniciar o servidor ou conectar no banco:', error);
    process.exit(1); // Opcional: força encerrar a aplicação se falhar);
  });
