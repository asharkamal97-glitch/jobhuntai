import { db } from '../../src/server/db';
import crypto from 'crypto';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const whopSignature = req.headers['whop-signature'] || req.headers['x-whop-signature'];
  const webhookSecret = process.env.WHOP_WEBHOOK_SECRET;

  // If webhook secret configured, verify HMAC signature
  if (webhookSecret && whopSignature) {
    const rawBody = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    const expectedSig = crypto.createHmac('sha256', webhookSecret).update(rawBody).digest('hex');
    if (whopSignature !== expectedSig && !whopSignature.includes(expectedSig)) {
      return res.status(401).json({ error: 'Invalid webhook signature' });
    }
  }

  const payload = req.body || {};
  const action = payload.action || payload.event || payload.type || 'payment.succeeded';
  const data = payload.data || payload;

  // Extract user email, order ID, product/plan identifier
  const userEmail = data.email || data.user_email || data.customer?.email || data.user?.email || '';
  const orderId = data.id || data.order_id || data.payment_id || `whop_${Date.now()}`;
  const planId = data.plan_id || 'plan_SbD2s3IA6C8qv';
  const productId = data.product_id || 'jobhunt-ai-pro';
  const amountCents = data.amount || data.total || 1499;
  const currency = data.currency || 'USD';

  if (!userEmail) {
    // If webhook does not include email, acknowledge but log warning
    return res.status(200).json({ received: true, note: 'Missing email in payload' });
  }

  // Find user by email if exists, or record purchase with userEmail
  const user = db.findUserByEmail(userEmail);
  const userId = user ? user.id : `usr_pending_${Date.now()}`;

  const status = (action === 'payment.failed' || action === 'refund.created') ? 'refunded' : 'paid';

  const purchase = db.createPurchase({
    userId,
    userEmail,
    whopOrderId: String(orderId),
    productId,
    planId,
    amountCents,
    currency,
    status,
    rawPayload: data
  });

  return res.status(200).json({
    success: true,
    message: 'Whop payment recorded successfully',
    purchaseId: purchase.id,
    userEmail: purchase.userEmail,
    status: purchase.status
  });
}