import { AppDataSource } from '../typeorm/data-source';
import app from './app';

export async function startServer() {
  try {
    await AppDataSource.initialize();
    console.log('Connected to database!');

    app.listen(3333, () => {
      console.log('Server runing on port 3333!');
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar o servidor ou conectar no banco:', error);
    process.exit(1); // Opcional: força encerrar a aplicação se falhar);
  }
}

startServer();
