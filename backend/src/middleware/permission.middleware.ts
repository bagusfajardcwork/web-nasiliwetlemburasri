import type {
  FastifyReply,
  FastifyRequest,
} from 'fastify';

import {
  getAuthenticatedUser,
} from '../modules/auth/auth.service.js';

export function authorize(
  requiredPermission: string,
) {
  return async function (
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    const userId = Number(request.user.sub);

    const user = await getAuthenticatedUser(
      userId,
    );

    if (!user) {
      return reply.status(401).send({
        success: false,
        message: 'User tidak ditemukan',
      });
    }

    if (!user.isActive) {
      return reply.status(403).send({
        success: false,
        message: 'User tidak aktif',
      });
    }

    const hasPermission =
      user.permissions.includes(
        requiredPermission,
      );

    if (!hasPermission) {
      return reply.status(403).send({
        success: false,
        message:
          'Anda tidak memiliki permission',
      });
    }
  };
}