import { db } from './server/db';
import { 
  registerUser, 
  authenticateUser, 
  validateSessionToken, 
  getUserEntitlementStatus,
  generateResetToken,
  hashPassword,
  verifyPassword
} from './server/auth';
import { WHOP_CHECKOUT_URL } from './services/entitlement';

// Mock localStorage
const memoryStore: Record<string, string> = {};
(global as any).localStorage = {
  getItem: (key: string) => memoryStore[key] || null,
  setItem: (key: string, value: string) => { memoryStore[key] = value; },
  removeItem: (key: string) => { delete memoryStore[key]; },
  clear: () => { Object.keys(memoryStore).forEach(k => delete memoryStore[k]); },
  key: (i: number) => Object.keys(memoryStore)[i] || null,
  length: 0
};

console.log('=== STARTING JOBHUNT AI SAAS MONETIZATION & AUTH TEST SUITE ===\n');

let passed = 0;
let total = 0;

function assert(condition: boolean, msg: string) {
  total++;
  if (condition) {
    passed++;
    console.log(`[PASS] ${msg}`);
  } else {
    console.error(`[FAIL] ${msg}`);
    process.exit(1);
  }
}

// Reset database for clean testing
db._resetForTesting();

// ---------------------------------------------------------------------------
// TEST A: New visitor -> Signup -> Whop payment webhook -> Entitlement updated
// ---------------------------------------------------------------------------
console.log('--- RUNNING TEST A: New Visitor Signup & Whop Webhook Payment ---');
const userAData = registerUser('sarah.connor@example.com', 'Cyberdyne1984!', 'Sarah Connor');
assert(!!userAData.user.id, 'TEST A: User account created successfully');
assert(userAData.user.email === 'sarah.connor@example.com', 'TEST A: User email recorded correctly');
assert(userAData.session.expiresAt > Date.now(), 'TEST A: Secure session token issued');

let entA = getUserEntitlementStatus(userAData.user.id, userAData.user.email);
assert(entA.isPaid === false, 'TEST A: Initial entitlement is unpaid (FREE_PREVIEW)');

// Simulate Whop Payment Webhook receipt
const whopOrderA = db.createPurchase({
  userId: userAData.user.id,
  userEmail: userAData.user.email,
  whopOrderId: 'whop_ord_A1001',
  productId: 'jobhunt-ai-pro',
  planId: 'plan_SbD2s3IA6C8qv',
  amountCents: 1499,
  currency: 'USD',
  status: 'paid'
});
assert(whopOrderA.status === 'paid', 'TEST A: Whop payment webhook recorded in database');

entA = getUserEntitlementStatus(userAData.user.id, userAData.user.email);
assert(entA.isPaid === true, 'TEST A: User entitlement immediately upgraded to FULL_ACCESS in database');
assert(entA.plan === 'FULL_ACCESS', 'TEST A: Plan reports FULL_ACCESS');

// ---------------------------------------------------------------------------
// TEST B: Existing account, unpaid -> login -> purchase -> full access
// ---------------------------------------------------------------------------
console.log('\n--- RUNNING TEST B: Unpaid User Login & Checkout Payment ---');
const userBData = registerUser('john.doe@example.com', 'Password123!', 'John Doe');
const loginB = authenticateUser('john.doe@example.com', 'Password123!');
assert(loginB.user.id === userBData.user.id, 'TEST B: Existing user authenticated');
let entB = getUserEntitlementStatus(loginB.user.id, loginB.user.email);
assert(entB.isPaid === false, 'TEST B: User is unpaid before purchase');

// Purchase recorded
db.createPurchase({
  userId: loginB.user.id,
  userEmail: loginB.user.email,
  whopOrderId: 'whop_ord_B2002',
  productId: 'jobhunt-ai-pro',
  planId: 'plan_SbD2s3IA6C8qv',
  amountCents: 1499,
  currency: 'USD',
  status: 'paid'
});
entB = getUserEntitlementStatus(loginB.user.id, loginB.user.email);
assert(entB.isPaid === true, 'TEST B: Paid access attached to account post-purchase');

// ---------------------------------------------------------------------------
// TEST C: Existing paid customer -> login -> server checks DB -> instant access
// ---------------------------------------------------------------------------
console.log('\n--- RUNNING TEST C: Returning Paid Customer Login ---');
const loginA = authenticateUser('sarah.connor@example.com', 'Cyberdyne1984!');
const entACheck = getUserEntitlementStatus(loginA.user.id, loginA.user.email);
assert(entACheck.isPaid === true, 'TEST C: Returning customer instantly receives FULL_ACCESS verified from DB');

// ---------------------------------------------------------------------------
// TEST D: Cross-Device Access (Phone -> Laptop)
// ---------------------------------------------------------------------------
console.log('\n--- RUNNING TEST D: Cross-Device Access Synchronization ---');
// User A logs in from a second device (new session token)
const sessionDevice2 = db.createSession(userAData.user.id, userAData.user.email);
const verifiedDevice2 = validateSessionToken(sessionDevice2.token);
assert(!!verifiedDevice2, 'TEST D: Second device session token validated');
const entDevice2 = getUserEntitlementStatus(verifiedDevice2!.user.id, verifiedDevice2!.user.email);
assert(entDevice2.isPaid === true, 'TEST D: Paid access automatically available on new device without local storage copy');

// ---------------------------------------------------------------------------
// TEST E & F: Access control for unpaid & logged out requests
// ---------------------------------------------------------------------------
console.log('\n--- RUNNING TEST E & F: Access Control & Guards ---');
const unpaidUser = registerUser('unpaid.visitor@example.com', 'UnpaidPass123!', 'Unpaid Visitor');
const entUnpaid = getUserEntitlementStatus(unpaidUser.user.id, unpaidUser.user.email);
assert(entUnpaid.isPaid === false, 'TEST E: Unpaid user correctly identified as unpaid');

const invalidSession = validateSessionToken('fake_session_token_12345');
assert(invalidSession === null, 'TEST F: Logged-out / invalid session token rejected by server');

// ---------------------------------------------------------------------------
// TEST G: Tampering Resistance (Client-side localStorage tampering)
// ---------------------------------------------------------------------------
console.log('\n--- RUNNING TEST G: Client-Side Tampering Resistance ---');
localStorage.setItem('jobhunt_ai_entitlement', 'FULL_ACCESS');
localStorage.setItem('isPaid', 'true');
// Server entitlement check ignores localStorage and strictly consults database
const entTamper = getUserEntitlementStatus(unpaidUser.user.id, unpaidUser.user.email);
assert(entTamper.isPaid === false, 'TEST G: LocalStorage manipulation fails to grant paid access on server');

// ---------------------------------------------------------------------------
// TEST H: Customer Logout (Session Invalidation)
// ---------------------------------------------------------------------------
console.log('\n--- RUNNING TEST H: Customer Logout ---');
db.deleteSession(userAData.session.token);
const sessionAfterLogout = validateSessionToken(userAData.session.token);
assert(sessionAfterLogout === null, 'TEST H: Logged-out session invalidated and rejected');

// ---------------------------------------------------------------------------
// TEST I: Password Reset Flow
// ---------------------------------------------------------------------------
console.log('\n--- RUNNING TEST I: Password Reset Flow ---');
const { token: resetToken, expires: resetExpires } = generateResetToken();
assert(resetToken.length >= 32, 'TEST I: Cryptographically secure reset token generated');
assert(resetExpires > Date.now(), 'TEST I: Reset token expiry is in the future');

const newPass = 'UpdatedSecurePass2026!';
const { hash: newHash, salt: newSalt } = hashPassword(newPass);
db.updateUser(userBData.user.id, { passwordHash: newHash, salt: newSalt });
const authWithNewPass = authenticateUser('john.doe@example.com', newPass);
assert(authWithNewPass.user.id === userBData.user.id, 'TEST I: User can successfully authenticate with new password');

// ---------------------------------------------------------------------------
// TEST J: Verified Customer Review System
// ---------------------------------------------------------------------------
console.log('\n--- RUNNING TEST J: Verified Customer Review System ---');
// User A is a verified purchaser
const purchasesA = db.findPurchasesByEmail('sarah.connor@example.com');
const isVerifiedA = purchasesA.some(p => p.status === 'paid');
assert(isVerifiedA === true, 'TEST J: Paid user identified as verified purchaser');

const reviewA = db.createReview({
  userId: userAData.user.id,
  userEmail: userAData.user.email,
  reviewerName: 'Sarah Connor',
  jobTitle: 'Strategic Operations Lead',
  rating: 5,
  reviewText: 'Claim Guard caught 3 unverified bullet points before my final export. Incredible product.',
  isVerifiedPurchase: isVerifiedA,
  isApproved: true
});
assert(reviewA.isVerifiedPurchase === true, 'TEST J: Review receives Verified Purchase badge');
assert(reviewA.rating === 5, 'TEST J: Review rating stored');

// Unpaid user submission check
const purchasesUnpaid = db.findPurchasesByEmail('unpaid.visitor@example.com');
const isVerifiedUnpaid = purchasesUnpaid.some(p => p.status === 'paid');
assert(isVerifiedUnpaid === false, 'TEST J: Unpaid user does NOT receive Verified Purchase badge');

const reviewUnpaid = db.createReview({
  userId: unpaidUser.user.id,
  userEmail: unpaidUser.user.email,
  reviewerName: 'Unpaid Visitor',
  rating: 4,
  reviewText: 'Great free preview of the Requirement Matrix.',
  isVerifiedPurchase: isVerifiedUnpaid,
  isApproved: true
});
assert(reviewUnpaid.isVerifiedPurchase === false, 'TEST J: Review marked without Verified Purchase badge');

// Public reviews query
const approvedReviews = db.getApprovedReviews();
assert(approvedReviews.length >= 2, 'TEST J: Approved reviews rendered for public display');

// ---------------------------------------------------------------------------
// WHOP CHECKOUT URL INTEGRITY
// ---------------------------------------------------------------------------
assert(
  WHOP_CHECKOUT_URL === 'https://whop.com/checkout/plan_SbD2s3IA6C8qv',
  'Whop checkout URL is preserved as https://whop.com/checkout/plan_SbD2s3IA6C8qv'
);

console.log(`\n=== ALL ${passed}/${total} SAAS MONETIZATION & AUTH TESTS PASSED ===`);