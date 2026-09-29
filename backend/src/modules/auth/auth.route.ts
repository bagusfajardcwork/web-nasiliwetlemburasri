import type { FastifyInstance } from 'fastify';

import {
  loginController,
  meController,
} from './auth.controller.js';

import {
  authenticate,
} from '../../middleware/auth.middleware.js';

export async function authRoute(
  app: FastifyInstance,
) {
  app.post(
    '/auth/login',
    loginController,
  );

  app.get(
    '/auth/me',
    {
      preHandler: authenticate,
    },
    meController,
  );
}