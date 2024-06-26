import express from 'express';
import 'reflect-metadata';
import parser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import environment from 'environment';
import db from 'database';
import router from 'router';
import errorHandling from 'middlewares/errorHandling';

const app = express();

app.use(parser.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use('/api', router);
app.use(errorHandling);

db.initialize()
  .then(() => {
    console.log(`Connection to database is successful (${environment.DB_NAME})`);
  })
  .catch((e) => {
    console.log('Connection to database failed: ', e);
  });

app.listen(environment.PORT, () => {
  console.log(`Server is running at port ${environment.PORT}`);
});
