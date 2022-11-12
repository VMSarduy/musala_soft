import express from 'express';
import { PrismaClient } from '@prisma/client';
import ApiEz from '../lib/main';

const prisma = new PrismaClient();

const app = express();

app.use(express.json());

app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://0.0.0.0:3000');
  res.header('Access-Control-Allow-Methods', 'PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, Methods, X-Requested-With, Content-Type, Accept');
  next();
});

const port = 3001;
const apiEz = new ApiEz(prisma, app);

apiEz.init();

app.get('/', (_req, res) => {
  res.send('Hello Musala!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://0.0.0.0:${port}`);
});

