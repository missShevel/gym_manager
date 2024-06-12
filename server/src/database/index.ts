import { DataSource } from 'typeorm';
import environment from 'environment';

const baseEntityFolder = environment.NODE_ENV === 'production' ? 'dist/src' : 'src';
const baseMigrationFolder = environment.NODE_ENV === 'production' ? 'dist/migrations/' : 'migrations/';

const database = new DataSource({
  type: 'postgres',
  host: environment.DB_HOST,
  port: environment.DB_PORT,
  username: environment.DB_USER,
  password: environment.DB_PASSWORD,
  database: environment.DB_NAME,

  synchronize: true,
  entities: [`${baseEntityFolder}/models/*.{ts,js}`],

  migrationsTableName: 'TypeORM_migrations',
  migrations: [`${baseMigrationFolder}/*.{ts,js}`],
  // migrationsRun: true,

  logging: ['error', 'migration'],
});

export default database;
