import type { FastifyInstance } from 'fastify';
import { sql } from 'drizzle-orm';

import { db } from '../config/database.js';

export async function healthRoute(app: FastifyInstance) {
  app.get('/health', async () => {
    const result = await db.execute(sql`SELECT 1 AS connected`);

    return {
      success: true,
      message: 'API is running',
      data: {
        status: 'ok',
        database: result[0],
        timestamp: new Date().toISOString(),
      },
    };
  });
}