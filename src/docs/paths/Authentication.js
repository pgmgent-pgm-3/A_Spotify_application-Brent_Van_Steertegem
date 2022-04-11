/**
 * The Role paths
 */

import userResponse from './responses/User.js';

export default {
  '/api/login': {
    summary: 'Send a request to the server to acces your account',
    description:
      'Send a request to the server with your login information so this data can be validated and you can get access to your account.',
    post: {
      tags: ['Authentication'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/AuthenticationInput',
            },
          },
        },
      },
      responses: userResponse,
    },
  },
  '/api/register': {
    summary: 'Send a request to the server to create a new account.',
    description:
      'Send a request to the server with your desired information in order to create a new account.',
    post: {
      tags: ['Authentication'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UserInput',
            },
          },
        },
      },
      responses: userResponse,
    },
  },
};
