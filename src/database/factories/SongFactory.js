import typeorm from 'typeorm';
// eslint-disable-next-line import/no-extraneous-dependencies
import faker from '@faker-js/faker';
import Factory from './Factory.js';

const { getConnection } = typeorm;

class SongFactory extends Factory {
  // make one record
  async make() {
    let randArtistId;
    let randAlbum;
    while (!randAlbum) {
      // get random artist
      const artistRepo = getConnection().getRepository('Artist');
      // eslint-disable-next-line no-await-in-loop
      const artists = await artistRepo.find();
      randArtistId = Math.floor(Math.random() * artists.length) + 1;
    }
    //   // get random album
    //   const albumRepo = getConnection().getRepository('Album');
    //   // eslint-disable-next-line no-await-in-loop
    //   const albums = await albumRepo.find({
    //     where: { artist_id: randArtistId },
    //     relations: ['artist_id'],
    //   });
    //   randAlbum = albums[Math.floor(Math.random() * albums.length)];
    // }

    const song = {
      name: faker.random.words(),
    };

    const record = await this.insert(song, randArtistId);
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
      // album_id: albumId,
    });

    // return
    return record;
  }
}

export default new SongFactory();
