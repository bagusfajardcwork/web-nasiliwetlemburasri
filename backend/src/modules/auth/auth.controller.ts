import type { FastifyReply, FastifyRequest } from 'fastify';

import { loginSchema } from './auth.schema.js';
import { loginUser } from './auth.service.js';

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