import typeorm from 'typeorm';
// eslint-disable-next-line import/no-extraneous-dependencies
import faker from '@faker-js/faker';
import Factory from './Factory.js';

const { getConnection } = typeorm;

class AlbumFactory extends Factory {
  // make one record
  async make() {
    // get random artist
    const artistRepo = getConnection().getRepository('Artist');
    const artists = await artistRepo.find();
    const randArtistId = Math.floor(Math.random() * artists.length) + 1;

    const album = {
      name: faker.random.words(),
    };

    const record = await this.insert(album, randArtistId);
    this.inserted.push(record);
    return record;
  }

  // eslint-disable-next-line class-methods-use-this
  async insert(album, artistId) {
    const repo = getConnection().getRepository('Album');
    // record exists?
    let record = await repo.findOne({
      where: { name: album.name },
    });
    if (record) return record;

    // create record
    record = await repo.save({
      name: album.name,
      artist_id: artistId,
    });

    // return
    return record;
  }
}

export default new AlbumFactory();
