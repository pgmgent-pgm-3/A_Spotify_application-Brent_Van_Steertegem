import typeorm from 'typeorm';
// eslint-disable-next-line import/no-extraneous-dependencies
import faker from '@faker-js/faker';
import Factory from './Factory.js';

const { getConnection } = typeorm;

class ArtistFactory extends Factory {
  // make one record
  async make() {
    const artist = {
      name: faker.random.words(),
    };

    const record = await this.insert(artist);
    this.inserted.push(record);
    return record;
  }

  // eslint-disable-next-line class-methods-use-this
  async insert(artist) {
    const repo = getConnection().getRepository('Artist');
    // record exists?
    let record = await repo.findOne({
      where: { name: artist.name },
    });
    if (record) return record;

    // create record
    record = await repo.save({
      name: artist.name,
    });

    // return
    return record;
  }
}

export default new ArtistFactory();
