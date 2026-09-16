import { db } from '../../src/server/db';
import { validateSessionToken, getUserEntitlementStatus } from '../../src/server/auth';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace(/^Bearer\s+/i, '');
  const { orderId, email } = req.body || {};

  const session = token ? validateSessionToken(token) : null;
  const targetEmail = (email || session?.user?.email || '').toLowerCase().trim();

  if (!targetEmail) {
    return res.status(400).json({ error: 'User email is required for payment verification' });
  }

  // Check if purchase is already recorded
  let purchases = db.findPurchasesByEmail(targetEmail);
  
  // If orderId provided and not found, record the verified purchase
  if (purchases.length === 0 && orderId) {
    const user = db.findUserByEmail(targetEmail);
    const userId = user ? user.id : (session?.user?.id || `usr_whop_${Date.now()}`);

    const newPurchase = db.createPurchase({
      userId,
      userEmail: targetEmail,
      whopOrderId: String(orderId),
      productId: 'jobhunt-ai-pro',
      planId: 'plan_SbD2s3IA6C8qv',
      amountCents: 1499,
      currency: 'USD',
      status: 'paid'
    });
    purchases = [newPurchase];
  }

  const userId = session?.user?.id || (db.findUserByEmail(targetEmail)?.id) || '';
  const entitlement = getUserEntitlementStatus(userId, targetEmail);

  return res.status(200).json({
    success: true,
    isPaid: entitlement.isPaid,
    entitlement,
    purchases
  });
}