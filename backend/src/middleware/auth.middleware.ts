import type {
  FastifyReply,
  FastifyRequest,
} from 'fastify';

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    await request.jwtVerify();
  } catch (error) {
    request.log.warn(
      {
        error,
      },
      'Authentication failed',
    );

    return reply.status(401).send({
      success: false,
      message: 'Unauthorized',
    });
  }
}