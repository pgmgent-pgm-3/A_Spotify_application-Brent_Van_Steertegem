import typeorm from 'typeorm';
// eslint-disable-next-line import/no-extraneous-dependencies
import faker from '@faker-js/faker';
import Factory from './Factory.js';

const { getConnection } = typeorm;

class PlaylistFactory extends Factory {
  // make one record
  async make() {
    // get role id for admin role
    const roleRepo = getConnection().getRepository('Role');
    const role = await roleRepo.findOne({
      where: { label: 'admin' },
    });

    // get random user
    const userRepo = getConnection().getRepository('User');
    const users = await userRepo.find({
      where: { role_id: role.id },
      relations: ['role_id'],
    });
    const randUserId = users[Math.floor(Math.random() * users.length)].id;

    // get random songs
    const songRepo = getConnection().getRepository('Song');
    const songs = await songRepo.find();
    const randAmount = Math.floor(Math.random() * songs.length);
    const selectedSongs = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < randAmount; i++) {
      const randNumber = Math.floor(Math.random() * songs.length);
      const song = songs.splice(randNumber, 1);
      selectedSongs.push(song[0]);
    }

    const playlist = {
      name: faker.random.words(),
    };

    const record = await this.insert(playlist, randUserId, selectedSongs);
    this.inserted.push(record);
    return record;
  }

  // eslint-disable-next-line class-methods-use-this
  async insert(playlist, userId, songs) {
    const repo = getConnection().getRepository('Playlist');
    // record exists?
    let record = await repo.findOne({
      where: { name: playlist.name },
    });
    if (record) return record;

    // create record
    record = await repo.save({
      name: playlist.name,
      user_id: userId,
      songs,
    });

    // return
    return record;
  }
}

export default new PlaylistFactory();
