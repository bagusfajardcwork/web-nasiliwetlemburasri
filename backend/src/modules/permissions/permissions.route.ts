import type { FastifyInstance } from 'fastify';

import { authenticate } from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/permission.middleware.js';

import {
  getPermissionController,
  getPermissionsController,
} from './permissions.controller.js';

export async function permissionsRoute(
  app: FastifyInstance,
) {
  app.get(
    '/permissions',
    {
      preHandler: [
        authenticate,
        authorize('permissions.read'),
      ],
    },
    getPermissionsController,
  );

  app.get(
    '/permissions/:id',
    {
      preHandler: [
        authenticate,
        authorize('permissions.read'),
      ],
    },
    getPermissionController,
  );
}