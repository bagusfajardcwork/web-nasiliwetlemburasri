import type { FastifyInstance } from 'fastify';

import {
  authenticate,
} from '../../middleware/auth.middleware.js';

import {
  authorize,
} from '../../middleware/permission.middleware.js';

import {
  getUsersController,
  getUserController,
  createUserController,
  updateUserController,
  deleteUserController,
} from './users.controller.js';

export async function usersRoute(
  app: FastifyInstance,
) {
  app.get(
    '/users',
    {
      preHandler: [
        authenticate,
        authorize('users.read'),
      ],
    },
    getUsersController,
  );

  app.get(
    '/users/:id',
    {
      preHandler: [
        authenticate,
        authorize('users.read'),
      ],
    },
    getUserController,
  );

  app.post(
    '/users',
    {
      preHandler: [
        authenticate,
        authorize('users.create'),
      ],
    },
    createUserController,
  );

  app.put(
    '/users/:id',
    {
      preHandler: [
        authenticate,
        authorize('users.update'),
      ],
    },
    updateUserController,
  );

  app.delete(
    '/users/:id',
    {
      preHandler: [
        authenticate,
        authorize('users.delete'),
      ],
    },
    deleteUserController,
  );
}