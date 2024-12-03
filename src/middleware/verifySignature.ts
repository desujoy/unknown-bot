import { Context } from 'hono';
import { verifyKey } from 'discord-interactions';

export async function verifySignature(c: Context, next: () => Promise<void>) {
  if (c.req.method !== 'POST') {
    return c.text('Method Not Allowed', { status: 405 });
  }

  const signature = c.req.header('X-Signature-Ed25519');
  const timestamp = c.req.header('X-Signature-Timestamp');

  if (!signature || !timestamp) {
    return c.text('Unauthorized', { status: 401 });
  }

  const isValid = await verifyKey(
    await c.req.arrayBuffer(), 
    signature, 
    timestamp, 
    c.env.DISCORD_PUBLIC_KEY
  );

  if (!isValid) {
    return c.text('Unauthorized', { status: 401 });
  }

  await next();
} 