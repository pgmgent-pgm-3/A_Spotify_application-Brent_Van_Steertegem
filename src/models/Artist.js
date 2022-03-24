import typeorm from 'typeorm';

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: 'Artist',
  tableName: 'artists',
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
    albums: {
      target: 'Album',
      type: 'one-to-many',
      joinColumn: true,
    },
    songs: {
      target: 'Song',
      type: 'one-to-many',
      joinColumn: true,
    },
  },
});
