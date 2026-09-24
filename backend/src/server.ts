import { buildApp } from './app.js';
import { env } from './config/env.js';

const app = buildApp();

app.listen({
  port: env.APP_PORT,
  host: '0.0.0.0',
}).then(() => {
  console.log(`Server berjalan di port ${env.APP_PORT}`);
});