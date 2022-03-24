import typeorm from 'typeorm';

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: 'UserMeta',
  tableName: 'user_meta',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    firstname: {
      type: 'varchar',
    },
    lastname: {
      type: 'varchar',
    },
    username: {
      type: 'varchar',
    },
    avatar: {
      type: 'varchar',
    },
  },
  relations: {
    user: {
      target: 'User',
      type: 'one-to-one',
      cascade: true,
      joinColumn: true,
    },
  },
});
