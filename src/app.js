import express from 'express';
import 'dotenv/config';
import * as path from 'path';
import { createConnection } from 'typeorm';
import entities from './models/index.js';

const app = express();
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve('src', 'views', 'index.html'));
});

/**
 * Create database connection and start listening
 */
createConnection({
  type: process.env.DATABASE_TYPE,
  database: process.env.DATABASE_NAME,
  entities,
  synchronize: true,
}).then(() => {
  app.listen(process.env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(
      `To Do Application is runninig on http://localhost:${process.env.PORT}/.`
    );
  });
});
