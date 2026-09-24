import Fastify from 'fastify';

import jwtPlugin from './plugins/jwt.js';
import { healthRoute } from './routes/health.route.js';
import { authRoute } from './modules/auth/auth.route.js';

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

  return app;
}