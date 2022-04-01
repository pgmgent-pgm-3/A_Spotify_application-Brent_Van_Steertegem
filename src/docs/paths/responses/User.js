/**
 * The User response
 */

export default {
  200: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/User',
        },
      },
    },
  },
};
