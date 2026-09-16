import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api, getStoredToken, setStoredToken, AuthResponse } from '../services/apiClient';
import { WHOP_CHECKOUT_URL } from '../services/entitlement';

export interface User {
  id: string;
  email: string;
  name?: string;
  emailVerified: boolean;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isPaid: boolean;
  isLoading: boolean;
  authModalOpen: boolean;
  authModalMode: 'login' | 'signup' | 'forgot';
  openAuthModal: (mode?: 'login' | 'signup' | 'forgot', onSuccess?: () => void) => void;
  closeAuthModal: () => void;
  login: (email: string, password: string) => Promise<AuthResponse>;
  signup: (email: string, password: string, name?: string) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<{ success: boolean; message: string; devResetToken?: string }>;
  resetPassword: (token: string, newPassword: string, email?: string) => Promise<{ success: boolean; message: string }>;
  proceedToCheckout: () => void;
  refreshEntitlement: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(getStoredToken());
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup' | 'forgot'>('signup');
  const [postAuthCallback, setPostAuthCallback] = useState<(() => void) | null>(null);

  const checkAuth = useCallback(async () => {
    const currentToken = getStoredToken();
    if (!currentToken) {
      setUser(null);
      setIsPaid(false);
      setIsLoading(false);
      return;
    }

    try {
      const res = await api.getMe();
      if (res.success && res.user) {
        setUser(res.user);
        setIsPaid(!!res.entitlement?.isPaid);
      } else {
        setUser(null);
        setIsPaid(false);
        setStoredToken(null);
      }
    } catch (err) {
      console.warn('Auth check error:', err);
      // If token invalid, clear
      setUser(null);
      setIsPaid(false);
      setStoredToken(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const openAuthModal = (mode: 'login' | 'signup' | 'forgot' = 'signup', onSuccess?: () => void) => {
    setAuthModalMode(mode);
    if (onSuccess) {
      setPostAuthCallback(() => onSuccess);
    } else {
      setPostAuthCallback(null);
    }
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
    setPostAuthCallback(null);
  };

  const login = async (email: string, password: string): Promise<AuthResponse> => {
    const res = await api.login(email, password);
    if (res.success && res.user) {
      setUser(res.user);
      setToken(res.token || null);
      setIsPaid(!!res.entitlement?.isPaid);
      closeAuthModal();
      if (postAuthCallback) {
        postAuthCallback();
      }
    }
    return res;
  };

  const signup = async (email: string, password: string, name?: string): Promise<AuthResponse> => {
    const res = await api.signup(email, password, name);
    if (res.success && res.user) {
      setUser(res.user);
      setToken(res.token || null);
      setIsPaid(!!res.entitlement?.isPaid);
      closeAuthModal();
      if (postAuthCallback) {
        postAuthCallback();
      }
    }
    return res;
  };

  const logout = async (): Promise<void> => {
    await api.logout();
    setUser(null);
    setToken(null);
    setIsPaid(false);
  };

  const forgotPassword = async (email: string) => {
    return api.forgotPassword(email);
  };

  const resetPassword = async (token: string, newPassword: string, email?: string) => {
    return api.resetPassword(token, newPassword, email);
  };

  const refreshEntitlement = async (): Promise<void> => {
    if (!token) return;
    try {
      const res = await api.getMe();
      if (res.success && res.entitlement) {
        setIsPaid(!!res.entitlement.isPaid);
      }
    } catch (err) {
      console.warn('Failed to refresh entitlement:', err);
    }
  };

  const proceedToCheckout = () => {
    // If user is logged in, append email/metadata to Whop checkout URL
    let checkoutUrl = WHOP_CHECKOUT_URL;
    if (user?.email) {
      checkoutUrl += `?email=${encodeURIComponent(user.email)}`;
    }
    window.open(checkoutUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isPaid,
        isLoading,
        authModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        login,
        signup,
        logout,
        forgotPassword,
        resetPassword,
        proceedToCheckout,
        refreshEntitlement
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};