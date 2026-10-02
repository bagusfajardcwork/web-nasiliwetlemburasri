import type {
  FastifyReply,
  FastifyRequest,
} from 'fastify';

import {
  createUserSchema,
  updateUserSchema,
  userIdSchema,
  usersQuerySchema
} from './users.schema.js';

import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from './users.service.js';

export async function getUsersController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const parsed =
    usersQuerySchema.safeParse(
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

  const result = await getUsers(
    parsed.data,
  );

  return reply.send({
    success: true,
    message:
      'Data user berhasil ditemukan',
    data: result.data,
    pagination: result.pagination,
  });
}

export async function getUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const parsed = userIdSchema.safeParse(
    request.params,
  );

  if (!parsed.success) {
    return reply.status(422).send({
      success: false,
      message: 'ID user tidak valid',
    });
  }

  const user = await getUserById(
    parsed.data.id,
  );

  if (!user) {
    return reply.status(404).send({
      success: false,
      message: 'User tidak ditemukan',
    });
  }

  return reply.send({
    success: true,
    message: 'User berhasil ditemukan',
    data: user,
  });
}

export async function createUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const parsed = createUserSchema.safeParse(
    request.body,
  );

  if (!parsed.success) {
    return reply.status(422).send({
      success: false,
      message: 'Validation error',
      errors:
      parsed.error.flatten().fieldErrors,
    });
  }

  try {
    const user = await createUser(
      parsed.data,
    );

    return reply.status(201).send({
      success: true,
      message: 'User berhasil dibuat',
      data: user,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === 'EMAIL_ALREADY_EXISTS'
    ) {
      return reply.status(409).send({
        success: false,
        message: 'Email sudah digunakan',
      });
    }

    throw error;
  }
}

export async function updateUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const params = userIdSchema.safeParse(
    request.params,
  );

  if (!params.success) {
    return reply.status(422).send({
      success: false,
      message: 'ID user tidak valid',
    });
  }

  const body = updateUserSchema.safeParse(
    request.body,
  );

  if (!body.success) {
    return reply.status(422).send({
      success: false,
      message: 'Validation error',
      errors:
      body.error.flatten().fieldErrors,
    });
  }

  const user = await updateUser(
    params.data.id,
    body.data,
  );

  if (!user) {
    return reply.status(404).send({
      success: false,
      message: 'User tidak ditemukan',
    });
  }

  return reply.send({
    success: true,
    message: 'User berhasil diperbarui',
    data: user,
  });
}

export async function deleteUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const parsed = userIdSchema.safeParse(
    request.params,
  );

  if (!parsed.success) {
    return reply.status(422).send({
      success: false,
      message: 'ID user tidak valid',
    });
  }

  const deleted = await deleteUser(
    parsed.data.id,
  );

  if (!deleted) {
    return reply.status(404).send({
      success: false,
      message: 'User tidak ditemukan',
    });
  }

  return reply.send({
    success: true,
    message: 'User berhasil dihapus',
  });
}