import 'dotenv/config';

import typeorm from 'typeorm';

const { createConnection } = typeorm;

// connect to database
export default class DatabaseSeeder {
  constructor(type, database, entities) {
    this.type = type;
    this.database = database;
    this.entities = entities;
  }

  async connect() {
    await createConnection({
      type: this.type,
      database: this.database,
      entities: this.entities,
      synchronize: true,
    });
  }

  async run(factory, amount = 1) {
    // connect to database
    await this.connect();

    if (amount > 1) {
      await factory.makeMany(amount);
    } else {
      await factory.make();
    }

    return factory.inserted;
  }
}
