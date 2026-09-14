import {
  getEntitlement,
  isFullAccess,
  canPerformNewAnalysis,
  getAnalysesCount,
  incrementAnalysesCount,
  resetAnalysesCount,
  activateLicense,
  deactivateLicense,
  isValidKeyFormat,
  getMaskedLicenseKey,
  WHOP_CHECKOUT_URL,
  CHECKOUT_URL
} from './services/entitlement';

// Mock localStorage in Node.js environment
const memoryStore: Record<string, string> = {};
global.localStorage = {
  getItem: (key: string) => memoryStore[key] || null,
  setItem: (key: string, value: string) => { memoryStore[key] = value; },
  removeItem: (key: string) => { delete memoryStore[key]; },
  clear: () => { Object.keys(memoryStore).forEach(k => delete memoryStore[k]); },
  key: (i: number) => Object.keys(memoryStore)[i] || null,
  length: 0
};

console.log('=== STARTING JOBHUNT AI MONETIZATION & SECURITY TEST SUITE ===\n');

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

// 1. Fresh Visitor State
localStorage.clear();
assert(getEntitlement() === 'FREE_PREVIEW', 'Fresh visitor defaults to FREE_PREVIEW');
assert(isFullAccess() === false, 'Fresh visitor is not full access');
assert(getAnalysesCount() === 0, 'Initial analysis count is 0');
assert(canPerformNewAnalysis() === true, 'Fresh visitor is allowed to perform 1 free analysis');

// 2. Completing First Free Analysis
const count1 = incrementAnalysesCount();
assert(count1 === 1, 'Analysis count increments to 1');
assert(canPerformNewAnalysis() === false, 'Free preview limits user to 1 analysis');

// 3. Whop Checkout URL Verification
assert(
  WHOP_CHECKOUT_URL === 'https://whop.com/checkout/plan_SbD2s3IA6C8qv',
  'Whop checkout URL matches plan_SbD2s3IA6C8qv'
);
assert(
  CHECKOUT_URL === 'https://whop.com/checkout/plan_SbD2s3IA6C8qv',
  'CHECKOUT_URL points to Whop checkout URL'
);

// 4. Key Format Validation Checks
assert(isValidKeyFormat('') === false, 'Empty key rejected');
assert(isValidKeyFormat('123') === false, 'Short key < 6 chars rejected');
assert(isValidKeyFormat('LS-ORD-98765-TEST') === true, 'Valid Lemon Squeezy order format accepted');
assert(isValidKeyFormat('e8425e89-ce34-4d04-a502-b82afa032726') === true, 'UUID license key accepted');

// 5. Tampering Resistance: Fabricating localStorage without valid signed receipt
localStorage.clear();
localStorage.setItem('jobhunt_ai_entitlement', 'FULL_ACCESS');
// Without matching signature and license key, getEntitlement falls back to FREE_PREVIEW
assert(getEntitlement() === 'FREE_PREVIEW', 'Manual localStorage tampering without valid signature falls back to FREE_PREVIEW');
assert(isFullAccess() === false, 'isFullAccess() returns false when tampered');

// 6. Activating Full Access via Valid License / Order Receipt
const activated = activateLicense('LS-ORD-98765-TEST');
assert(activated === true, 'Valid receipt key activates license');
assert(getEntitlement() === 'FULL_ACCESS', 'Entitlement tier updates to FULL_ACCESS');
assert(isFullAccess() === true, 'isFullAccess() returns true');
assert(canPerformNewAnalysis() === true, 'Full Access user has unlimited analyses');
assert(getMaskedLicenseKey().includes('****'), 'License key is masked for privacy');

// 7. Deactivation / Reset Test
deactivateLicense();
assert(getEntitlement() === 'FREE_PREVIEW', 'Deactivation returns to FREE_PREVIEW');
assert(isFullAccess() === false, 'Deactivation removes full access');

// 8. Free user clearing localStorage -> still treated as free
localStorage.clear();
assert(getEntitlement() === 'FREE_PREVIEW', 'Clearing localStorage defaults back to FREE_PREVIEW');
assert(getAnalysesCount() === 0, 'Analyses count is 0 after storage clear');
assert(canPerformNewAnalysis() === true, 'Allowed 1 analysis on fresh clear, but not Full Access');

console.log(`\n=== ALL ${passed}/${total} MONETIZATION & SECURITY TESTS PASSED ===`);
