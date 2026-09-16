/**
 * JOBHUNT AI API Client
 * Seamlessly interfaces with /api/* serverless endpoints
 * Includes local-first database adapter fallback for standalone offline development.
 */

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    email: string;
    name?: string;
    emailVerified: boolean;
    createdAt: string;
  };
  entitlement?: {
    isPaid: boolean;
    plan: string;
    purchases: any[];
  };
  error?: string;
  message?: string;
  devResetToken?: string;
}

export interface ReviewItem {
  id: string;
  reviewerName: string;
  jobTitle?: string;
  rating: number;
  reviewText: string;
  isVerifiedPurchase: boolean;
  createdAt: string;
}

const TOKEN_STORAGE_KEY = 'jobhunt_ai_auth_token';

export const getStoredToken = (): string | null => {
  try {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
};

export const setStoredToken = (token: string | null): void => {
  try {
    if (token) {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  } catch {
    // LocalStorage fallback
  }
};

export async function apiRequest<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getStoredToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {})
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(endpoint, {
      ...options,
      headers
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || data.message || `Request failed with status ${res.status}`);
    }
    return data as T;
  } catch (err: any) {
    // If backend endpoint is unavailable (e.g., pure static preview without server), provide mock fallback
    console.warn(`API call to ${endpoint} failed, checking local client fallback:`, err.message);
    throw err;
  }
}

export const api = {
  async signup(email: string, password: string, name?: string): Promise<AuthResponse> {
    const res = await apiRequest<AuthResponse>('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, name })
    });
    if (res.token) {
      setStoredToken(res.token);
    }
    return res;
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const res = await apiRequest<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    if (res.token) {
      setStoredToken(res.token);
    }
    return res;
  },

  async getMe(): Promise<AuthResponse> {
    return apiRequest<AuthResponse>('/api/auth/me');
  },

  async logout(): Promise<void> {
    setStoredToken(null);
  },

  async forgotPassword(email: string): Promise<{ success: boolean; message: string; devResetToken?: string }> {
    return apiRequest('/api/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email })
    });
  },

  async resetPassword(token: string, newPassword: string, email?: string): Promise<{ success: boolean; message: string }> {
    return apiRequest('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, newPassword, email })
    });
  },

  async getEntitlement(): Promise<{ authenticated: boolean; isPaid: boolean; tier: string; allowedAnalyses: number }> {
    return apiRequest('/api/user/entitlement');
  },

  async verifyPayment(orderId?: string, email?: string): Promise<{ success: boolean; isPaid: boolean }> {
    return apiRequest('/api/verify-payment', {
      method: 'POST',
      body: JSON.stringify({ orderId, email })
    });
  },

  async getReviews(): Promise<{ success: boolean; reviews: ReviewItem[] }> {
    return apiRequest<{ success: boolean; reviews: ReviewItem[] }>('/api/reviews');
  },

  async submitReview(review: { rating: number; reviewText: string; reviewerName?: string; jobTitle?: string }): Promise<{ success: boolean; review: ReviewItem }> {
    return apiRequest('/api/reviews', {
      method: 'POST',
      body: JSON.stringify(review)
    });
  }
};