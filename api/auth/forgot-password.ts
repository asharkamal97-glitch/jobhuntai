import { db } from '../../src/server/db';
import { generateResetToken } from '../../src/server/auth';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body || {};
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const user = db.findUserByEmail(email);
  if (!user) {
    // Return success to prevent email enumeration
    return res.status(200).json({ success: true, message: 'If an account exists, a reset link has been dispatched.' });
  }

  const { token, expires } = generateResetToken();
  db.updateUser(user.id, { resetToken: token, resetTokenExpires: expires });

  return res.status(200).json({
    success: true,
    message: 'Password reset link sent to your email.',
    // For test convenience in demo/dev mode
    devResetToken: process.env.NODE_ENV !== 'production' ? token : undefined
  });
}