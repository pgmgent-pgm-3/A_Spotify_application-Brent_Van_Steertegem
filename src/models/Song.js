import typeorm from 'typeorm';

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: 'Song',
  tableName: 'songs',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
  },
  relations: {
    artist_id: {
      target: 'Artist',
      type: 'many-to-one',
      joinColumn: true,
      cascade: true,
    },
    album_id: {
      target: 'Album',
      type: 'many-to-many',
    },
    playlists: {
      target: 'Playlist',
      type: 'many-to-many',
    },
  },
});
