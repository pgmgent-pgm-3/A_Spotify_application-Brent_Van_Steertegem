import typeorm from 'typeorm';
// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';
import Factory from './Factory.js';
import RoleFactory from './RoleFactory.js';
import UserMetaFactory from './UserMetaFactory.js';

const { getConnection } = typeorm;

class UserFactory extends Factory {
  constructor() {
    super();
    this.roles = RoleFactory.roles;
  }

  // make one record
  async make() {
    const randRoleId = Math.floor(Math.random() * this.roles.length) + 1;

    const userMeta = await UserMetaFactory.make();

    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(8),
    };

    const record = await this.insert(user, userMeta, randRoleId);
    this.inserted.push(record);
  }

  // eslint-disable-next-line class-methods-use-this
  async insert(user, userMeta, roleId) {
    const repo = getConnection().getRepository('User');

    // record exists?
    let record = await repo.findOne({ where: { email: user.email } });
    if (record) return record;
    // create record
    record = await repo.save({
      ...user,
      user_meta_id: userMeta.id,
      role_id: roleId,
    });

    // update the user meta so it contains the user id
    const userMetaRepo = getConnection().getRepository('UserMeta');
    await userMetaRepo.save({
      ...userMeta,
      user_id: record.id,
    });

    // return
    return record;
  }
}

export default new UserFactory();
