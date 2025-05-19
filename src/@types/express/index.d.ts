// Fazendo sobrescrita de um type do express.
declare namespace Express {
  export interface Request {
    user: {
      id: number;
    };
  }
}
