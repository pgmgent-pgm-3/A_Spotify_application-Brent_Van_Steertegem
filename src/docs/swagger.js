/**
 * The Swagger configuration
 */

import schemas from './schemas.js';
import paths from './paths/index.js';

export default {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'An API to control data',
    description: 'An API to control data created by Brent Van Steertegem',
    license: {
      name: 'Arteveldehogeschool',
      url: 'https://arteveldehogeschool.be',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'development server',
    },
  ],
  tags: [
    {
      name: 'Authentication',
      description: 'All the endpoints used for authentication.',
    },
    {
      name: 'Users',
      description:
        'All the create, read, update and delete actions for the users.',
    },
    // {
    //   name: 'Artists',
    //   description:
    //     'All the create, read, update and delete actions for the roles.',
    // },
  ],
  paths,
  components: {
    schemas,
  },
};
