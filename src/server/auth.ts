import crypto from 'crypto';
import { db, UserRecord, SessionRecord } from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'jobhunt_ai_jwt_secret_dev_2026_salt';

export function hashPassword(password: string, existingSalt?: string): { hash: string; salt: string } {
  const salt = existingSalt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return { hash, salt };
}

export function verifyPassword(password: string, hash: string, salt: string): boolean {
  const check = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(check, 'hex'));
}

export function generateResetToken(): { token: string; expires: number } {
  const token = crypto.randomBytes(32).toString('hex');
  const expires = Date.now() + 3600 * 1000; // 1 hour
  return { token, expires };
}

export function registerUser(email: string, password: string, name?: string): { user: UserRecord; session: SessionRecord } {
  const cleanEmail = email.toLowerCase().trim();
  if (!cleanEmail || !cleanEmail.includes('@')) {
    throw new Error('Valid email address is required');
  }
  if (!password || password.length < 6) {
    throw new Error('Password must be at least 6 characters long');
  }

  const existing = db.findUserByEmail(cleanEmail);
  if (existing) {
    throw new Error('An account with this email already exists');
  }

  const { hash, salt } = hashPassword(password);
  const user = db.createUser({
    email: cleanEmail,
    passwordHash: hash,
    salt,
    name: name?.trim() || cleanEmail.split('@')[0],
    emailVerified: false
  });

  const session = db.createSession(user.id, user.email);
  return { user, session };
}

export function authenticateUser(email: string, password: string): { user: UserRecord; session: SessionRecord } {
  const cleanEmail = email.toLowerCase().trim();
  const user = db.findUserByEmail(cleanEmail);
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isValid = verifyPassword(password, user.passwordHash, user.salt);
  if (!isValid) {
    throw new Error('Invalid email or password');
  }

  const session = db.createSession(user.id, user.email);
  return { user, session };
}

export function validateSessionToken(token: string): { user: UserRecord; session: SessionRecord } | null {
  if (!token) return null;
  const session = db.findSession(token);
  if (!session) return null;

  const user = db.findUserById(session.userId);
  if (!user) return null;

  return { user, session };
}

export function getUserEntitlementStatus(userId: string, email: string): { isPaid: boolean; plan: string; purchases: any[] } {
  const userPurchases = db.findPurchasesByUserId(userId);
  const emailPurchases = db.findPurchasesByEmail(email);

  // Combine unique purchases
  const allPurchases = [...userPurchases];
  for (const p of emailPurchases) {
    if (!allPurchases.some(ap => ap.id === p.id)) {
      allPurchases.push(p);
    }
  }

  const isPaid = allPurchases.some(p => p.status === 'paid');
  return {
    isPaid,
    plan: isPaid ? 'FULL_ACCESS' : 'FREE_PREVIEW',
    purchases: allPurchases
  };
}