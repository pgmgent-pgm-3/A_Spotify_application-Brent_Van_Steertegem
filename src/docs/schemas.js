/**
 * Our API schemas
 */

export default {
  AuthenticationInput: {
    properties: {
      email: { type: 'string' },
      password: { type: 'string' },
    },
  },
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
  Role: {
    properties: {
      id: { type: 'number' },
      label: { type: 'string' },
    },
  },
  Artist: {
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
    },
  },
  ArtistInput: {
    properties: {
      name: { type: 'string' },
    },
    example: {
      name: 'Taylor Hawkins',
    },
  },
  Song: {
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
      artist_id: {
        $ref: '#/components/schemas/Artist',
      },
    },
    example: {
      id: 81,
      name: 'Encino',
      artist_id: {
        id: 12,
        name: 'PCI',
      },
    },
  },
  SongInput: {
    properties: {
      name: { type: 'string' },
      artist_id: {
        id: { type: 'number' },
        name: { type: 'string' },
      },
    },
    example: {
      name: 'Encino',
      artist_id: {
        id: 12,
        name: 'PCI',
      },
    },
  },
};
