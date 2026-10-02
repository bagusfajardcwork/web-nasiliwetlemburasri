import type { FastifyInstance } from 'fastify';

import {
  authenticate,
} from '../middleware/auth.middleware.js';

import {
  authorize,
} from '../middleware/permission.middleware.js';

export async function testAuthRoute(
  app: FastifyInstance,
) {
  /**
   * Test authentication
   */
  app.get(
    '/test-auth',
    {
      preHandler: [
        authenticate,
      ],
    },
    async () => {
      return {
        success: true,
        message: 'Authentication berhasil',
      };
    },
  );

  /**
   * Test permissions users.create
   */
  app.get(
    '/test-users-create',
    {
      preHandler: [
        authenticate,
        authorize('users.create'),
      ],
    },
    async () => {
      return {
        success: true,
        message:
          'Anda memiliki permissions users.create',
      };
    },
  );

  /**
   * Test permissions users.delete
   */
  app.get(
    '/test-users-delete',
    {
      preHandler: [
        authenticate,
        authorize('users.delete'),
      ],
    },
    async () => {
      return {
        success: true,
        message:
          'Anda memiliki permissions users.delete',
      };
    },
  );
}