import type {
  FastifyReply,
  FastifyRequest,
} from 'fastify';

import {
  getPermissionById,
  getPermissions,
} from './permissions.service.js';

import {
  permissionIdSchema,
  permissionsQuerySchema,
} from './permissions.schema.js';

export async function getPermissionsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const parsed = permissionsQuerySchema.safeParse(
    request.query,
  );

  if (!parsed.success) {
    return reply.status(422).send({
      success: false,
      message: 'Query tidak valid',
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  const result = await getPermissions(parsed.data);

  return reply.send({
    success: true,
    message: 'Permission berhasil ditemukan',
    ...result,
  });
}

export async function getPermissionController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const parsed = permissionIdSchema.safeParse(
    request.params,
  );

  if (!parsed.success) {
    return reply.status(422).send({
      success: false,
      message: 'ID permission tidak valid',
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  const permission = await getPermissionById(
    parsed.data.id,
  );

  if (!permission) {
    return reply.status(404).send({
      success: false,
      message: 'Permission tidak ditemukan',
    });
  }

  return reply.send({
    success: true,
    message: 'Permission berhasil ditemukan',
    data: permission,
  });
}