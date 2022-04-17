/**
 * The Artist paths
 */

import artistResponse from './responses/Artist.js';

export default {
  '/artist': {
    summary: 'Send a request to the server to create a new artist.',
    description:
      'Send a request to the server with your desired information in order to create a new artist.',
    post: {
      tags: ['Artists'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ArtistInput',
            },
          },
        },
      },
      responses: artistResponse,
    },
  },
  '/artists': {
    summary: 'Gets all the artists',
    description: 'Gets all the artists in the database...',
    get: {
      tags: ['Artists'],
      responses: {
        200: {
          description: 'Fetching artists was a success!',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Artists',
                },
              },
            },
          },
        },
      },
    },
  },
  '/artist/{id}': {
    summary: 'Manipulate an existing artist',
    description: 'Manipulate an existing artist...',
    put: {
      tags: ['Artists'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer',
            minimum: 1,
          },
          description: 'The artist Id',
        },
      ],
      responses: artistResponse,
    },
    delete: {
      tags: ['Artists'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer',
            minimum: 1,
          },
          description: 'The artist Id',
        },
      ],
      responses: artistResponse,
    },
  },
};
