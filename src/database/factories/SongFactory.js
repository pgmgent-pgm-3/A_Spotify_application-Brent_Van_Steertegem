import typeorm from 'typeorm';
// eslint-disable-next-line import/no-extraneous-dependencies
import faker from '@faker-js/faker';
import Factory from './Factory.js';

const { getConnection } = typeorm;

class SongFactory extends Factory {
  // make one record
  async make() {
    // get random artist
    const artistRepo = getConnection().getRepository('Artist');
    const artists = await artistRepo.find();
    const randArtist = Math.floor(Math.random() * artists.length) + 1;

    const song = {
      name: faker.random.words(),
    };

    const record = await this.insert(song, randArtist);
    this.inserted.push(record);
    return record;
  }

  // eslint-disable-next-line class-methods-use-this
  async insert(song, artistId) {
    const repo = getConnection().getRepository('Song');
    // record exists?
    let record = await repo.findOne({
      where: { name: song.name },
    });
    if (record) return record;

    // create record
    record = await repo.save({
      name: song.name,
      artist_id: artistId,
    });

    // return
    return record;
  }
}

export default new SongFactory();
