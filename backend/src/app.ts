import Fastify from 'fastify';

import jwtPlugin from './plugins/jwt.js';
import { healthRoute } from './routes/health.route.js';
import { authRoute } from './modules/auth/auth.route.js';
import { testAuthRoute } from './routes/test-auth.route.js';
import { usersRoute } from './modules/users/users.route.js';
import { rolesRoute } from './modules/roles/roles.route.js';
import { permissionsRoute } from './modules/permissions/permissions.route.js';

export function buildApp() {
  const app = Fastify({
    logger: true,
  });

  app.register(jwtPlugin);

  app.register(healthRoute, {
    prefix: '/api/v1',
  });

  app.register(authRoute, {
    prefix: '/api/v1',
  });

  app.register(testAuthRoute, {
    prefix: '/api/v1',
  });

  app.register(usersRoute, {
    prefix: '/api/v1',
  });

  app.register(rolesRoute, {
    prefix: '/api/v1',
  });

  app.register(
    permissionsRoute,
    { prefix: '/api/v1' },
  );

  return app;
}