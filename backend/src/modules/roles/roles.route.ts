import type { FastifyInstance } from 'fastify';

import {
  authenticate,
} from '../../middleware/auth.middleware.js';

import {
  authorize,
} from '../../middleware/permission.middleware.js';

import {
  getRolesController,
  getRoleController,
  createRoleController,
  updateRoleController,
  deleteRoleController,
} from './roles.controller.js';

export async function rolesRoute(
  app: FastifyInstance,
) {
  app.get(
    '/roles',
    {
      preHandler: [
        authenticate,
        authorize('roles.read'),
      ],
    },
    getRolesController,
  );

  app.get(
    '/roles/:id',
    {
      preHandler: [
        authenticate,
        authorize('roles.read'),
      ],
    },
    getRoleController,
  );

  app.post(
    '/roles',
    {
      preHandler: [
        authenticate,
        authorize('roles.create'),
      ],
    },
    createRoleController,
  );

  app.put(
    '/roles/:id',
    {
      preHandler: [
        authenticate,
        authorize('roles.update'),
      ],
    },
    updateRoleController,
  );

  app.delete(
    '/roles/:id',
    {
      preHandler: [
        authenticate,
        authorize('roles.delete'),
      ],
    },
    deleteRoleController,
  );
}