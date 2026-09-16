import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User as UserIcon, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle,
  KeyRound,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AuthModal: React.FC = () => {
  const { 
    authModalOpen, 
    authModalMode, 
    closeAuthModal, 
    openAuthModal, 
    login, 
    signup, 
    forgotPassword, 
    resetPassword 
  } = useAuth();

  const [mode, setMode] = useState<'signup' | 'login' | 'forgot' | 'reset'>(authModalMode || 'signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync mode with context
  React.useEffect(() => {
    if (authModalMode) {
      setMode(authModalMode);
      setErrorMsg(null);
      setSuccessMsg(null);
    }
  }, [authModalMode, authModalOpen]);

  if (!authModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsSubmitting(true);

    try {
      if (mode === 'signup') {
        if (!email.trim() || !password) {
          throw new Error('Please fill in all required fields');
        }
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match');
        }
        await signup(email.trim(), password, name.trim());
      } else if (mode === 'login') {
        if (!email.trim() || !password) {
          throw new Error('Email and password are required');
        }
        await login(email.trim(), password);
      } else if (mode === 'forgot') {
        if (!email.trim()) {
          throw new Error('Please enter your email address');
        }
        const res = await forgotPassword(email.trim());
        setSuccessMsg(res.message || 'Password reset link sent! Check your inbox.');
        if (res.devResetToken) {
          setResetToken(res.devResetToken);
          setMode('reset');
        }
      } else if (mode === 'reset') {
        if (!resetToken.trim() || !password) {
          throw new Error('Reset token and new password are required');
        }
        if (password.length < 6) {
          throw new Error('New password must be at least 6 characters');
        }
        const res = await resetPassword(resetToken.trim(), password, email.trim());
        setSuccessMsg(res.message || 'Password reset successfully! You can now log in.');
        setTimeout(() => {
          setMode('login');
          setSuccessMsg(null);
        }, 1800);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden my-8 relative">
        
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center text-sm shadow">
              JH
            </div>
            <div>
              <h3 className="font-extrabold text-base tracking-tight text-white">
                {mode === 'signup' && 'Create your JOBHUNT AI account'}
                {mode === 'login' && 'Log in to JOBHUNT AI'}
                {mode === 'forgot' && 'Reset your password'}
                {mode === 'reset' && 'Set new password'}
              </h3>
              <p className="text-[11px] text-slate-400">
                {mode === 'signup' && 'Your permanent key to full application intelligence'}
                {mode === 'login' && 'Welcome back! Access your tailored workspace'}
                {mode === 'forgot' && 'We will help you recover access securely'}
                {mode === 'reset' && 'Choose a strong password with min 6 characters'}
              </p>
            </div>
          </div>
          <button 
            onClick={closeAuthModal} 
            className="text-slate-400 hover:text-white p-1 rounded-lg transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher for Signup / Login */}
        {(mode === 'signup' || mode === 'login') && (
          <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-bold text-slate-600">
            <button
              type="button"
              onClick={() => { setMode('signup'); setErrorMsg(null); setSuccessMsg(null); }}
              className={`flex-1 py-3 text-center transition border-b-2 ${
                mode === 'signup' 
                  ? 'border-brand-600 text-brand-700 bg-white font-extrabold' 
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              Create Account
            </button>
            <button
              type="button"
              onClick={() => { setMode('login'); setErrorMsg(null); setSuccessMsg(null); }}
              className={`flex-1 py-3 text-center transition border-b-2 ${
                mode === 'login' 
                  ? 'border-brand-600 text-brand-700 bg-white font-extrabold' 
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              Log In
            </button>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Error Message */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Success Message */}
          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Name Field (Signup only) */}
          {mode === 'signup' && (
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">Full Name (Optional)</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
                />
              </div>
            </div>
          )}

          {/* Email Field (Signup, Login, Forgot) */}
          {mode !== 'reset' && (
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">Email Address <span className="text-rose-500">*</span></label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.morgan@example.com"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
                />
              </div>
            </div>
          )}

          {/* Reset Token Field (Reset mode only) */}
          {mode === 'reset' && (
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">Reset Token <span className="text-rose-500">*</span></label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={resetToken}
                  onChange={(e) => setResetToken(e.target.value)}
                  placeholder="Enter token from your email"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition font-mono"
                />
              </div>
            </div>
          )}

          {/* Password Field */}
          {mode !== 'forgot' && (
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-700">
                  {mode === 'reset' ? 'New Password' : 'Password'} <span className="text-rose-500">*</span>
                </label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => { setMode('forgot'); setErrorMsg(null); setSuccessMsg(null); }}
                    className="text-[11px] font-semibold text-brand-600 hover:text-brand-800"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
                />
              </div>
            </div>
          )}

          {/* Confirm Password Field (Signup only) */}
          {mode === 'signup' && (
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">Confirm Password <span className="text-rose-500">*</span></label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-4 bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold rounded-xl shadow-md transition flex items-center justify-center space-x-2 border border-amber-500 disabled:opacity-60 text-xs sm:text-sm mt-2"
          >
            {isSubmitting ? (
              <span>Processing...</span>
            ) : (
              <>
                <span>
                  {mode === 'signup' && 'Create Account & Continue'}
                  {mode === 'login' && 'Log In to Workspace'}
                  {mode === 'forgot' && 'Send Reset Link'}
                  {mode === 'reset' && 'Update Password'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Back to login if in forgot/reset mode */}
          {(mode === 'forgot' || mode === 'reset') && (
            <button
              type="button"
              onClick={() => { setMode('login'); setErrorMsg(null); setSuccessMsg(null); }}
              className="w-full py-2 text-xs font-bold text-slate-600 hover:text-slate-900 text-center block"
            >
              Back to Log In
            </button>
          )}

          {/* Trust Guarantee */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-center space-x-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span>Secure account encryption • Cross-device access</span>
          </div>

        </form>

      </div>
    </div>
  );
};