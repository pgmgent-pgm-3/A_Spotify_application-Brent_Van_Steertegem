import typeorm from 'typeorm';
// eslint-disable-next-line import/no-extraneous-dependencies
import faker from '@faker-js/faker';
import Factory from './Factory.js';

const { getConnection } = typeorm;

class AlbumFactory extends Factory {
  // make one record
  async make() {
    const album = {
      name: faker.random.words(),
    };

    // get random artist
    const artistRepo = getConnection().getRepository('Artist');
    const artists = await artistRepo.find();
    const randArtistId = Math.floor(Math.random() * artists.length) + 1;

    // get random amount of songs from artist
    const songRepo = getConnection().getRepository('Song');
    const songs = await songRepo.find({
      where: { artist_id: randArtistId },
      relations: ['artist_id'],
    });
    const randAmount = Math.floor(Math.random() * songs.length);
    const selectedSongs = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < randAmount; i++) {
      const randNumber = Math.floor(Math.random() * songs.length);
      const song = songs.splice(randNumber, 1);
      selectedSongs.push(song[0].id);
    }

    const record = await this.insert(album, randArtistId, selectedSongs);
    this.inserted.push(record);
    return record;
  }

  // eslint-disable-next-line class-methods-use-this
  async insert(album, artistId, songs) {
    const repo = getConnection().getRepository('Album');
    // record exists?
    let record = await repo.findOne({
      where: { name: album.name, artist_id: artistId },
    });
    if (record) return record;

    // create record
    record = await repo.save({
      name: album.name,
      artist_id: artistId,
      songs,
    });

    // return
    return record;
  }
}

export default new AlbumFactory();
