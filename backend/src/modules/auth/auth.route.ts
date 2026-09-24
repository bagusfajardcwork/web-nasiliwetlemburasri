import type { FastifyInstance } from 'fastify';

import { loginController } from './auth.controller.js';

export async function authRoute(
  app: FastifyInstance,
) {
  app.post(
    '/auth/login',
    loginController,
  );
}