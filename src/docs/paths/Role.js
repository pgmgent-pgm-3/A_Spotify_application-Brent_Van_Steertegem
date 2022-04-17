/**
 * The Role paths
 */

import roleResponse from './responses/Role.js';

export default {
  '/role/{id}': {
    summary: 'Get an existing role',
    description: 'Get an existing role...',
    get: {
      tags: ['Roles'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer',
            minimum: 1,
          },
          description: 'The role Id',
        },
      ],
      responses: roleResponse,
    },
    '/roles': {
      summary: 'Get all the roles',
      description: 'Get all the roles in the database...',
      get: {
        tags: ['Roles'],
        responses: {
          200: {
            description: 'Fetching roles was a success!',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Role',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
