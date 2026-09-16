import { validateSessionToken, getUserEntitlementStatus } from '../../src/server/auth';

export default async function handler(req: any, res: any) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace(/^Bearer\s+/i, '') || req.query.token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: missing session token' });
  }

  const sessionData = validateSessionToken(token);
  if (!sessionData) {
    return res.status(401).json({ error: 'Session expired or invalid' });
  }

  const { user } = sessionData;
  const entitlement = getUserEntitlementStatus(user.id, user.email);

  return res.status(200).json({
    success: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt
    },
    entitlement
  });
}