import 'reflect-metadata';
import 'express-async-errors';
import express, { ErrorRequestHandler } from 'express';
import cors from 'cors';
import routes from './routes';
import ErrorHandlerMiddleware from '@shared/middlewares/ErrorHandlerMiddleware';
import { errors } from 'celebrate';
import RateLimiter from '@shared/middlewares/RateLimiter';
import '@shared/container';

// Declaração do errorHandler aqui para o Typescript não reclamar em app.use().
const syntaxErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof SyntaxError && 'body' in err) {
    res.status(400).json({ error: 'Malformed JSON in request body.' });
    return;
  }
  next(err);
};

const app = express();
app.use(cors());
app.use(express.json());

// Adicionando o Rate Limiter para evitar ataque hacker de força bruta.
app.use(RateLimiter);

app.use(routes);

// Usando o middleware do celebrate para que as validações dos esquemas sejam feitas.
app.use(errors());

app.use(syntaxErrorHandler);

// Depois de lançar as rotas, chamo o middleware para pegar os erros.
app.use(ErrorHandlerMiddleware.HandleError);

export default app;
