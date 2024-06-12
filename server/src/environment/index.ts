import * as envalid from 'envalid';
import 'dotenv/config';

const environment = envalid.cleanEnv(process.env, {
  NODE_ENV: envalid.str({ choices: ['production', 'development'] }),
  PORT: envalid.num(),
  DB_PORT: envalid.num(),
  DB_USER: envalid.str(),
  DB_PASSWORD: envalid.str(),
  DB_NAME: envalid.str(),
  DB_HOST: envalid.str(),
  SALT_ROUNDS: envalid.num(),
  COOKIE_EXPIRE: envalid.num(),
});

export default environment;
