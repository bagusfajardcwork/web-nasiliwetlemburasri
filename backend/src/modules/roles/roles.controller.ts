import type {
  FastifyReply,
  FastifyRequest,
} from 'fastify';

import {
  createRoleSchema,
  updateRoleSchema,
  roleIdSchema,
  rolesQuerySchema,
} from './roles.schema.js';

import {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} from './roles.service.js';

export async function getRolesController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const parsed =
    rolesQuerySchema.safeParse(
      request.query,
    );

  if (!parsed.success) {
    return reply.status(422).send({
      success: false,
      message: 'Query tidak valid',
      errors:
      parsed.error.flatten()
        .fieldErrors,
    });
  }

  const result = await getRoles(
    parsed.data,
  );

  return reply.send({
    success: true,
    message:
      'Data role berhasil ditemukan',
    data: result.data,
    pagination:
    result.pagination,
  });
}

export async function getRoleController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const parsed =
    roleIdSchema.safeParse(
      request.params,
    );

  if (!parsed.success) {
    return reply.status(422).send({
      success: false,
      message: 'ID role tidak valid',
    });
  }

  const role =
    await getRoleById(
      parsed.data.id,
    );

  if (!role) {
    return reply.status(404).send({
      success: false,
      message: 'Role tidak ditemukan',
    });
  }

  return reply.send({
    success: true,
    message:
      'Role berhasil ditemukan',
    data: role,
  });
}

export async function createRoleController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const parsed =
    createRoleSchema.safeParse(
      request.body,
    );

  if (!parsed.success) {
    return reply.status(422).send({
      success: false,
      message: 'Validation error',
      errors:
      parsed.error.flatten()
        .fieldErrors,
    });
  }

  try {
    const role =
      await createRole(
        parsed.data,
      );

    return reply.status(201).send({
      success: true,
      message:
        'Role berhasil dibuat',
      data: role,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message ===
      'ROLE_ALREADY_EXISTS'
    ) {
      return reply.status(409).send({
        success: false,
        message:
          'Nama role sudah digunakan',
      });
    }

    throw error;
  }
}

export async function updateRoleController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const params =
    roleIdSchema.safeParse(
      request.params,
    );

  if (!params.success) {
    return reply.status(422).send({
      success: false,
      message: 'ID role tidak valid',
    });
  }

  const body =
    updateRoleSchema.safeParse(
      request.body,
    );

  if (!body.success) {
    return reply.status(422).send({
      success: false,
      message: 'Validation error',
      errors:
      body.error.flatten()
        .fieldErrors,
    });
  }

  const role =
    await updateRole(
      params.data.id,
      body.data,
    );

  if (!role) {
    return reply.status(404).send({
      success: false,
      message: 'Role tidak ditemukan',
    });
  }

  return reply.send({
    success: true,
    message:
      'Role berhasil diperbarui',
    data: role,
  });
}

export async function deleteRoleController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const parsed = roleIdSchema.safeParse(request.params);

  if (!parsed.success) {
    return reply.status(422).send({
      success: false,
      message: 'ID role tidak valid',
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  try {
    const result = await deleteRole(parsed.data.id);

    if (result === null) {
      return reply.status(404).send({
        success: false,
        message: 'Role tidak ditemukan',
      });
    }

    return reply.send({
      success: true,
      message: 'Role berhasil dihapus',
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === 'ROLE_IN_USE'
    ) {
      return reply.status(409).send({
        success: false,
        message: 'Role sedang digunakan oleh user',
      });
    }

    request.log.error({ error }, 'Delete role failed');

    return reply.status(500).send({
      success: false,
      message: 'Gagal menghapus role',
    });
  }
}