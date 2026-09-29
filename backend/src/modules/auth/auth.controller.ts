import type {
  FastifyReply,
  FastifyRequest,
} from 'fastify';

import {
  loginSchema,
} from './auth.schema.js';

import {
  loginUser,
  getAuthenticatedUser,
} from './auth.service.js';

export async function loginController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const parsed = loginSchema.safeParse(
    request.body,
  );

  if (!parsed.success) {
    return reply.status(422).send({
      success: false,
      message: 'Validation error',
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  try {
    const user = await loginUser(
      parsed.data.email,
      parsed.data.password,
    );

    const accessToken = await reply.jwtSign({
      sub: user.id,
      email: user.email,
      role: user.role,
      type: 'access',
    });

    return reply.send({
      success: true,
      message: 'Login berhasil',
      data: {
        user,
        accessToken,
      },
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === 'USER_INACTIVE'
    ) {
      return reply.status(403).send({
        success: false,
        message: 'User tidak aktif',
      });
    }

    return reply.status(401).send({
      success: false,
      message: 'Email atau password salah',
    });
  }
}

export async function meController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userId = Number(request.user.sub);

  const user = await getAuthenticatedUser(
    userId,
  );

  if (!user) {
    return reply.status(404).send({
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

  return reply.send({
    success: true,
    message: 'User berhasil ditemukan',
    data: user,
  });
}