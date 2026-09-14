export type EntitlementTier = 'FREE_PREVIEW' | 'FULL_ACCESS';

const ENTITLEMENT_KEY = 'jobhunt_ai_entitlement';
const ANALYSES_COUNT_KEY = 'jobhunt_ai_analyses_count';
const LICENSE_KEY = 'jobhunt_ai_license_key';
const TOKEN_SIG_KEY = 'jobhunt_ai_auth_sig';

export const WHOP_CHECKOUT_URL = 'https://whop.com/checkout/plan_SbD2s3IA6C8qv';
export const CHECKOUT_URL = WHOP_CHECKOUT_URL;
export const LEMON_SQUEEZY_CHECKOUT_URL = WHOP_CHECKOUT_URL;

/**
 * Generates a deterministic client-side checksum for a key
 * Note: Pure client-side validation is soft verification for MVP local-first runtime.
 * Real payment verification requires server-side webhooks/database.
 */
function computeSignature(key: string): string {
  let hash = 0;
  const str = `jobhunt_ent_${key.trim()}_salt_2026`;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return `SIG_${Math.abs(hash).toString(36)}`;
}

/**
 * Formats/validates an order receipt or license key.
 * Accepts standard Lemon Squeezy order ID formats, UUIDs, or license keys.
 */
export function isValidKeyFormat(key: string): boolean {
  const trimmed = key.trim();
  if (trimmed.length < 6) return false;
  // Accepts formats like LS-12345, ORD-12345, UUID, or alphanumeric license keys
  const pattern = /^[A-Za-z0-9\-_]{6,64}$/;
  return pattern.test(trimmed);
}

export const getEntitlement = (): EntitlementTier => {
  const saved = localStorage.getItem(ENTITLEMENT_KEY);
  const license = localStorage.getItem(LICENSE_KEY);
  const sig = localStorage.getItem(TOKEN_SIG_KEY);

  if (saved === 'FULL_ACCESS') {
    // Verify that a valid license and matching signature exist
    if (license && sig && sig === computeSignature(license)) {
      return 'FULL_ACCESS';
    }
    // If artificially set in localStorage without valid signed receipt, fallback to preview
    return 'FREE_PREVIEW';
  }
  return 'FREE_PREVIEW';
};

export const isFullAccess = (): boolean => {
  return getEntitlement() === 'FULL_ACCESS';
};

export const getAnalysesCount = (): number => {
  const saved = localStorage.getItem(ANALYSES_COUNT_KEY);
  return saved ? parseInt(saved, 10) || 0 : 0;
};

export const incrementAnalysesCount = (): number => {
  const next = getAnalysesCount() + 1;
  localStorage.setItem(ANALYSES_COUNT_KEY, next.toString());
  return next;
};

export const resetAnalysesCount = (): void => {
  localStorage.setItem(ANALYSES_COUNT_KEY, '0');
};

export const canPerformNewAnalysis = (): boolean => {
  if (isFullAccess()) return true;
  return getAnalysesCount() < 1;
};

export const getSavedLicenseKey = (): string => {
  return localStorage.getItem(LICENSE_KEY) || '';
};

export const getMaskedLicenseKey = (): string => {
  const key = getSavedLicenseKey();
  if (!key) return '';
  if (key.length <= 8) return '****' + key.slice(-3);
  return key.slice(0, 3) + '****' + key.slice(-4);
};

export const activateLicense = (key: string): boolean => {
  const trimmed = key.trim();
  if (!isValidKeyFormat(trimmed)) {
    return false;
  }
  const sig = computeSignature(trimmed);
  localStorage.setItem(LICENSE_KEY, trimmed);
  localStorage.setItem(TOKEN_SIG_KEY, sig);
  localStorage.setItem(ENTITLEMENT_KEY, 'FULL_ACCESS');
  localStorage.setItem('jobhunt_ai_is_pro', 'true');
  return true;
};

export const deactivateLicense = (): void => {
  localStorage.removeItem(LICENSE_KEY);
  localStorage.removeItem(TOKEN_SIG_KEY);
  localStorage.setItem(ENTITLEMENT_KEY, 'FREE_PREVIEW');
  localStorage.setItem('jobhunt_ai_is_pro', 'false');
};

export const setEntitlement = (tier: EntitlementTier): void => {
  if (tier === 'FULL_ACCESS') {
    activateLicense('LS-DIRECT-ACTIVATION');
  } else {
    deactivateLicense();
  }
};

// Internal test-only helper to explicitly set tier for automated unit test runs
export const __testSetEntitlement = (tier: EntitlementTier): void => {
  if (tier === 'FULL_ACCESS') {
    activateLicense('LS-TEST-SUITE-RUNNER');
  } else {
    deactivateLicense();
  }
};
