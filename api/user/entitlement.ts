import { validateSessionToken, getUserEntitlementStatus } from '../../src/server/auth';
import { db } from '../../src/server/db';

export default async function handler(req: any, res: any) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace(/^Bearer\s+/i, '') || req.query.token;

  if (!token) {
    return res.status(200).json({
      authenticated: false,
      isPaid: false,
      tier: 'FREE_PREVIEW',
      allowedAnalyses: 1
    });
  }

  const sessionData = validateSessionToken(token);
  if (!sessionData) {
    return res.status(200).json({
      authenticated: false,
      isPaid: false,
      tier: 'FREE_PREVIEW',
      allowedAnalyses: 1
    });
  }

  const { user } = sessionData;
  const entitlement = getUserEntitlementStatus(user.id, user.email);

  return res.status(200).json({
    authenticated: true,
    userId: user.id,
    email: user.email,
    isPaid: entitlement.isPaid,
    tier: entitlement.plan,
    allowedAnalyses: entitlement.isPaid ? Infinity : 1,
    purchases: entitlement.purchases
  });
}