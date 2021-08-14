import { injectable } from 'inversify';
import knex from 'knex';

@injectable()
export class DatabaseConnection {
  make = knex({
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'postgres',
    },
    pool: { min: 0, max: 100 },
  });
}
