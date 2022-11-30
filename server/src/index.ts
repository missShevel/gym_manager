import express from 'express';
import 'reflect-metadata';
import parser from 'body-parser';
import cookieParser from 'cookie-parser'
import cors from 'cors'





import environment from 'environment';
import db from 'database';
import router from 'router';

const app = express();

app.use(parser.json());
app.use(cookieParser());
app.use(cors({
  origin: '*',
}));
app.use('/api', router);

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
