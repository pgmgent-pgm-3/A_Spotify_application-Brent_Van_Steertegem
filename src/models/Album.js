import typeorm from 'typeorm';

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: 'Album',
  tableName: 'albums',
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
    songs: {
      target: 'Song',
      type: 'many-to-many',
      joinTable: true,
      cascade: true,
    },
  },
});
