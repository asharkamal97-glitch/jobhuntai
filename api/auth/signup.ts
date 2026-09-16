import type { IncomingMessage, ServerResponse } from 'http';
import { registerUser, getUserEntitlementStatus } from '../../src/server/auth';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password, name } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const { user, session } = registerUser(email, password, name);
    const entitlement = getUserEntitlementStatus(user.id, user.email);

    return res.status(201).json({
      success: true,
      token: session.token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt
      },
      entitlement
    });
  } catch (err: any) {
    return res.status(400).json({ error: err.message || 'Registration failed' });
  }
}