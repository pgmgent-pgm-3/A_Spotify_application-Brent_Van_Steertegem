import express from 'express';
import 'dotenv/config';
import * as path from 'path';
import { createConnection } from 'typeorm';
import { create } from 'express-handlebars';
import entities from './models/index.js';
import HandlebarsHelpers from './lib/HandlebarsHelpers.js';
import { home } from './controllers/home.js';
import { SOURCE_PATH } from './consts.js';

const app = express();
app.use(express.static('public'));

/**
 * Handlebars init
 */
const hbs = create({
  helpers: HandlebarsHelpers,
  extname: 'hbs',
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(SOURCE_PATH, 'views'));

/**
 * App Routing
 */
app.get('/', home);

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
