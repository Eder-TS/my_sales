import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import ErrorHandlerMiddleware from '@shared/middlewares/ErrorHandlerMiddleware';
import { errors } from 'celebrate';
import RateLimiter from '@shared/middlewares/RateLimiter';
import { AppDataSource } from '../typeorm/data-source';
import '@shared/container';

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(cors());
    app.use(express.json());

    // Adicionando o Rate Limiter para evitar ataque hacker de força bruta.
    app.use(RateLimiter);

    app.use(routes);

    // Usando o middleware do celebrate para que as validações dos esquemas sejam feitas.
    app.use(errors());

    app.use(
      (
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
      ) => {
        if (err instanceof SyntaxError && 'body' in err) {
          return res
            .status(400)
            .json({ error: 'Malformed JSON in request body.' });
        }
        next(err);
      },
    );

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
