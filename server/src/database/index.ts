import { DataSource } from 'typeorm';
import environment from 'environment';

const database = new DataSource({
  type: 'postgres',
  host: environment.DB_HOST,
  port: environment.DB_PORT,
  username: environment.DB_USER,
  password: environment.DB_PASSWORD,
  database: environment.DB_NAME,

  synchronize: true,
  entities: ['src/models/*.ts'],

  migrationsTableName: 'TypeORM_migrations',
  migrations: ['migrations/*.ts'],

  logging: ['error', 'migration'],
});

export default database;
