import { db } from '../../src/server/db';
import { hashPassword } from '../../src/server/auth';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token, newPassword } = req.body || {};
  if (!token || !newPassword || newPassword.length < 6) {
    return res.status(400).json({ error: 'Valid reset token and new password (min 6 chars) are required' });
  }

  // Find user by reset token
  const allUsers = (db as any).getAllUsers ? (db as any).getAllUsers() : [];
  const user = db.findUserByEmail(req.body.email || '') || allUsers.find((u: any) => u.resetToken === token);

  if (!user || user.resetToken !== token || (user.resetTokenExpires && user.resetTokenExpires < Date.now())) {
    return res.status(400).json({ error: 'Invalid or expired password reset token' });
  }

  const { hash, salt } = hashPassword(newPassword);
  db.updateUser(user.id, {
    passwordHash: hash,
    salt,
    resetToken: undefined,
    resetTokenExpires: undefined
  });

  return res.status(200).json({ success: true, message: 'Password has been reset successfully. You can now log in.' });
}