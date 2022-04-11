import typeorm from 'typeorm';
import Factory from './Factory.js';

const { getConnection } = typeorm;

class RoleFactory extends Factory {
  constructor() {
    super();
    this.roles = ['reader', 'editor', 'admin'];
  }

  // make one record
  async make() {
    await this.makeMany();
  }

  // make many records
  async makeMany() {
    // for every role, do an insert
    // eslint-disable-next-line no-restricted-syntax
    for (const role of this.roles) {
      // eslint-disable-next-line no-await-in-loop
      const record = await this.insert(role);
      this.inserted.push(record);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async insert(label) {
    const repo = getConnection().getRepository('Role');

    // record exists?
    let record = await repo.findOne({ where: { label } });
    if (record) return record;

    // create record
    record = await repo.save({ label });

    // return
    return record;
  }
}

export default new RoleFactory();
