//import { AppDataSource } from '../../src/shared/infra/typeorm/data-source';
import app from '../../src/shared/infra/http/server';
import { Server } from 'http';

let server: Server;

export function setup(close?: string) {
  server = app.listen(3333);

  if (close === 'close') {
    server.close(() => {
      console.log('Closed!');
    });
  }
}
