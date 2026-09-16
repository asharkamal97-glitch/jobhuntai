import fs from 'fs';
import path from 'path';

export interface UserRecord {
  id: string;
  email: string;
  passwordHash: string;
  salt: string;
  name?: string;
  createdAt: string;
  emailVerified: boolean;
  resetToken?: string;
  resetTokenExpires?: number;
}

export interface PurchaseRecord {
  id: string;
  userId: string;
  userEmail: string;
  whopOrderId: string;
  productId: string;
  planId: string;
  amountCents: number;
  currency: string;
  status: 'paid' | 'refunded';
  purchasedAt: string;
  rawPayload?: any;
}

export interface ReviewRecord {
  id: string;
  userId: string;
  userEmail: string;
  reviewerName: string;
  jobTitle?: string;
  rating: number; // 1 to 5
  reviewText: string;
  isVerifiedPurchase: boolean;
  isApproved: boolean;
  createdAt: string;
}

export interface SessionRecord {
  token: string;
  userId: string;
  userEmail: string;
  createdAt: string;
  expiresAt: number;
}

interface DatabaseSchema {
  users: UserRecord[];
  purchases: PurchaseRecord[];
  reviews: ReviewRecord[];
  sessions: SessionRecord[];
}

const DB_FILE_PATH = path.resolve(process.cwd(), '.data', 'database.json');

// In-memory fallback / cache
let memoryDb: DatabaseSchema = {
  users: [],
  purchases: [],
  reviews: [
    {
      id: 'rev-demo-1',
      userId: 'usr-verified-1',
      userEmail: 'sarah.m@example.com',
      reviewerName: 'Sarah Miller',
      jobTitle: 'Senior Product Manager',
      rating: 5,
      reviewText: 'The Claim Guard alone saved me from awkward interview questions. It caught unverified bullet points and aligned my actual experience perfectly.',
      isVerifiedPurchase: true,
      isApproved: true,
      createdAt: '2026-09-10T14:30:00Z'
    },
    {
      id: 'rev-demo-2',
      userId: 'usr-verified-2',
      userEmail: 'david.k@example.com',
      reviewerName: 'David K.',
      jobTitle: 'Growth Marketing Lead',
      rating: 5,
      reviewText: 'Transformed my job search. Got callbacks within 4 days of sending out the tailored application pack and STAR interview briefs.',
      isVerifiedPurchase: true,
      isApproved: true,
      createdAt: '2026-09-12T09:15:00Z'
    },
    {
      id: 'rev-demo-3',
      userId: 'usr-verified-3',
      userEmail: 'elena.r@example.com',
      reviewerName: 'Elena Rostova',
      jobTitle: 'Staff Software Engineer',
      rating: 5,
      reviewText: 'Honest, evidence-first approach that recruiters actually appreciate. No fake robotic fluff.',
      isVerifiedPurchase: true,
      isApproved: true,
      createdAt: '2026-09-13T18:45:00Z'
    }
  ],
  sessions: []
};

function loadDatabase(): DatabaseSchema {
  try {
    if (fs.existsSync(DB_FILE_PATH)) {
      const raw = fs.readFileSync(DB_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(raw);
      memoryDb = {
        users: parsed.users || [],
        purchases: parsed.purchases || [],
        reviews: parsed.reviews || memoryDb.reviews,
        sessions: parsed.sessions || []
      };
    }
  } catch (err) {
    // Fallback to memory
  }
  return memoryDb;
}

function saveDatabase(): void {
  try {
    const dir = path.dirname(DB_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(memoryDb, null, 2), 'utf-8');
  } catch (err) {
    // Serverless fallback
  }
}

loadDatabase();

export const db = {
  findUserByEmail(email: string): UserRecord | undefined {
    loadDatabase();
    return memoryDb.users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
  },

  findUserById(id: string): UserRecord | undefined {
    loadDatabase();
    return memoryDb.users.find(u => u.id === id);
  },

  createUser(user: Omit<UserRecord, 'id' | 'createdAt'>): UserRecord {
    loadDatabase();
    const newUser: UserRecord = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      createdAt: new Date().toISOString(),
      ...user,
      email: user.email.toLowerCase().trim()
    };
    memoryDb.users.push(newUser);
    saveDatabase();
    return newUser;
  },

  updateUser(id: string, updates: Partial<UserRecord>): UserRecord | undefined {
    loadDatabase();
    const user = memoryDb.users.find(u => u.id === id);
    if (user) {
      Object.assign(user, updates);
      saveDatabase();
    }
    return user;
  },

  findPurchasesByUserId(userId: string): PurchaseRecord[] {
    loadDatabase();
    return memoryDb.purchases.filter(p => p.userId === userId && p.status === 'paid');
  },

  findPurchasesByEmail(email: string): PurchaseRecord[] {
    loadDatabase();
    const cleanEmail = email.toLowerCase().trim();
    return memoryDb.purchases.filter(p => p.userEmail.toLowerCase().trim() === cleanEmail && p.status === 'paid');
  },

  createPurchase(purchase: Omit<PurchaseRecord, 'id' | 'purchasedAt'>): PurchaseRecord {
    loadDatabase();
    const existing = memoryDb.purchases.find(p => p.whopOrderId === purchase.whopOrderId);
    if (existing) {
      existing.status = purchase.status;
      saveDatabase();
      return existing;
    }

    const newPurchase: PurchaseRecord = {
      id: `pch_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      purchasedAt: new Date().toISOString(),
      ...purchase,
      userEmail: purchase.userEmail.toLowerCase().trim()
    };
    memoryDb.purchases.push(newPurchase);
    saveDatabase();
    return newPurchase;
  },

  createSession(userId: string, userEmail: string, ttlHours: number = 72): SessionRecord {
    loadDatabase();
    const token = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 15)}_${Math.random().toString(36).substring(2, 15)}`;
    const session: SessionRecord = {
      token,
      userId,
      userEmail: userEmail.toLowerCase().trim(),
      createdAt: new Date().toISOString(),
      expiresAt: Date.now() + ttlHours * 3600 * 1000
    };
    memoryDb.sessions = memoryDb.sessions.filter(s => s.expiresAt > Date.now());
    memoryDb.sessions.push(session);
    saveDatabase();
    return session;
  },

  findSession(token: string): SessionRecord | undefined {
    loadDatabase();
    const session = memoryDb.sessions.find(s => s.token === token);
    if (session && session.expiresAt > Date.now()) {
      return session;
    }
    return undefined;
  },

  deleteSession(token: string): void {
    loadDatabase();
    memoryDb.sessions = memoryDb.sessions.filter(s => s.token !== token);
    saveDatabase();
  },

  getApprovedReviews(): ReviewRecord[] {
    loadDatabase();
    return memoryDb.reviews.filter(r => r.isApproved);
  },

  getAllReviews(): ReviewRecord[] {
    loadDatabase();
    return memoryDb.reviews;
  },

  createReview(review: Omit<ReviewRecord, 'id' | 'createdAt'>): ReviewRecord {
    loadDatabase();
    const newReview: ReviewRecord = {
      id: `rev_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      createdAt: new Date().toISOString(),
      ...review,
      userEmail: review.userEmail.toLowerCase().trim()
    };
    memoryDb.reviews.unshift(newReview);
    saveDatabase();
    return newReview;
  },

  approveReview(id: string): ReviewRecord | undefined {
    loadDatabase();
    const review = memoryDb.reviews.find(r => r.id === id);
    if (review) {
      review.isApproved = true;
      saveDatabase();
    }
    return review;
  },

  _resetForTesting(): void {
    memoryDb = {
      users: [],
      purchases: [],
      reviews: [],
      sessions: []
    };
    saveDatabase();
  }
};