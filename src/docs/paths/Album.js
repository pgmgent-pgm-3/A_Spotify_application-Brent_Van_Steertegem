/**
 * The Album paths
 */

import albumResponse from './responses/Album.js';

export default {
  '/album': {
    summary: 'Send a request to the server to create a new album.',
    description:
      'Send a request to the server with your desired information in order to create a new album.',
    post: {
      tags: ['Albums'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/AlbumInput',
            },
          },
        },
      },
      responses: albumResponse,
    },
  },
  '/albums': {
    summary: 'Gets all the albums',
    description: 'Gets all the albums in the database...',
    get: {
      tags: ['Albums'],
      responses: {
        200: {
          description: 'Fetching albums was a success!',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Albums',
                },
              },
            },
          },
        },
      },
    },
  },
  '/album/{id}': {
    summary: 'Manipulate an existing album',
    description: 'Manipulate an existing album...',
    get: {
      tags: ['Albums'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer',
            minimum: 1,
          },
          description: 'The album Id',
        },
      ],
      responses: {
        200: {
          description: 'Fetching album was a success!',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Albums',
                },
              },
            },
          },
        },
      },
    },
    put: {
      tags: ['Albums'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer',
            minimum: 1,
          },
          description: 'The album Id',
        },
      ],
      responses: albumResponse,
    },
    delete: {
      tags: ['Albums'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer',
            minimum: 1,
          },
          description: 'The album Id',
        },
      ],
      responses: {
        200: {
          description: 'Deleting album was a success!',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Albums',
                },
              },
            },
          },
        },
      },
    },
  },
};
