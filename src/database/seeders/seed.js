// imports
import DatabaseSeeder from './DatabaseSeeder.js';
import { RoleFactory, UserFactory } from '../factories/index.js';
import entities from '../../models/index.js';

// new instance of the db seeder
const dbSeeder = new DatabaseSeeder(
  process.env.DATABASE_TYPE,
  process.env.DATABASE_NAME,
  entities
);

// seed with the role factory
dbSeeder.run(RoleFactory).then((records) => {
  console.log(`${records.length} seeded in db`);
  console.log(records);
});

// seed with the user factory
dbSeeder.run(UserFactory, 20).then((records) => {
  console.log(`${records.length} seeded in db`);
  console.log(records);
});
