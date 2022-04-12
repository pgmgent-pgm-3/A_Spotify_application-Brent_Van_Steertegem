import typeorm from 'typeorm';
// eslint-disable-next-line import/no-extraneous-dependencies
import faker from '@faker-js/faker';
import Factory from './Factory.js';

const { getConnection } = typeorm;

class UserMetaFactory extends Factory {
  // make one record
  async make() {
    const userMeta = {
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      username: faker.internet.userName(),
      avatar: faker.internet.avatar(),
    };

    const record = await this.insert(userMeta);
    this.inserted.push(record);
    return record;
  }

  // eslint-disable-next-line class-methods-use-this
  async insert(userMeta) {
    const repo = getConnection().getRepository('UserMeta');
    // record exists?
    let record = await repo.findOne({
      where: { username: userMeta.username },
    });
    if (record) return record;

    // create record
    record = await repo.save({
      firstname: userMeta.firstname,
      lastname: userMeta.lastname,
      username: userMeta.username,
      avatar: userMeta.avatar,
    });

    // return
    return record;
  }
}

export default new UserMetaFactory();
