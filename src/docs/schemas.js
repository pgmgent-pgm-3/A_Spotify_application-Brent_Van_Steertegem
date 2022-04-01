/**
 * Our API schemas
 */

export default {
  User: {
    properties: {
      id: { type: 'number' },
      email: { type: 'string' },
      password: { type: 'string' },
      user_meta: {
        $ref: '#/components/schemas/UserMeta',
      },
      role: {
        $ref: '#/components/schemas/Role',
      },
    },
  },
  UserInput: {
    properties: {
      email: { type: 'string' },
      password: { type: 'string' },
      user_meta: {
        $ref: '#/components/schemas/UserMeta',
      },
      role: {
        $ref: '#/components/schemas/Role',
      },
    },
    example: {
      email: 'Ada.lovelace@mail.com',
      password: 'LoveyDovey',
      user_meta: {
        firstname: 'Ada',
        lastname: 'Lovelace',
        username: 'AdaLace',
        avatar: 'avatar.jpg',
      },
      role: {
        name: 'admin',
      },
    },
  },
  UserMeta: {
    properties: {
      id: { type: 'number' },
      firstname: { type: 'string' },
      lastname: { type: 'string' },
      username: { type: 'string' },
      avatar: { type: 'string' },
    },
  },
  UserMetaInput: {
    properties: {
      firstname: { type: 'string' },
      lastname: { type: 'string' },
      username: { type: 'string' },
      avatar: { type: 'string' },
    },
  },
  Role: {
    properties: {
      id: { type: 'number' },
      label: { type: 'string' },
    },
  },
};
