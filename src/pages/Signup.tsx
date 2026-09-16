import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bot, Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../services/AuthContext';

export const Signup: React.FC = () => {
  const { signup, googleLogin, testDriveData, isLoading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    let valid = true;
    setEmailError('');
    setPasswordError('');
    setFormError('');

    // Email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    }

    // Password check: minimum 8 characters
    if (!password || password.length < 8) {
      setPasswordError('Password must be at least 8 characters.');
      valid = false;
    }

    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const result = await signup(email, password);
    setIsSubmitting(false);

    if (result.success) {
      // Redirect directly to /onboarding as required
      navigate('/onboarding');
    } else {
      setFormError(result.error || 'Failed to create account. Please try again.');
    }
  };

  const handleGoogleSignup = async () => {
    setIsSubmitting(true);
    const result = await googleLogin();
    setIsSubmitting(false);
    if (result.success) {
      navigate('/onboarding');
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden selection:bg-blue-500/30 selection:text-blue-200">
      
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Container */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        
        {/* LeadPilot AI Logo at the top */}
        <div className="flex justify-center mb-6">
          <Link
            to="/"
            id="signup-brand-logo"
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-500 p-0.5 shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all duration-300 flex items-center justify-center">
              <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center">
                <Bot className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold tracking-tight text-white font-sans">
                LeadPilot
              </span>
              <span className="text-xs font-semibold px-1.5 py-0.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/30 font-mono">
                AI
              </span>
            </div>
          </Link>
        </div>

        {/* Heading & Subheading */}
        <div className="text-center space-y-2 mb-8">
          <h1
            id="signup-heading"
            className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight"
          >
            Create your LeadPilot account
          </h1>
          <p
            id="signup-subheading"
            className="text-sm text-slate-300"
          >
            Unlock your AI-generated leads and start growing your business.
          </p>
        </div>

        {/* Preserved Test Drive Leads Badge (if visitor scanned leads previously) */}
        {testDriveData && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 flex items-center gap-3 animate-in fade-in">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <p className="font-bold text-white">
                {testDriveData.prospectsFound} Prospects Discovered in {testDriveData.city}
              </p>
              <p className="text-emerald-300 font-mono text-[11px]">
                {testDriveData.qualifiedLeads} Qualified leads will unlock in your new workspace
              </p>
            </div>
          </div>
        )}

        {/* Premium Auth Card */}
        <div className="rounded-2xl bg-[#0b0f1a] border border-blue-500/30 p-6 sm:p-8 shadow-2xl shadow-blue-950/40 ring-1 ring-white/10 relative">
          
          {formError && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300">
              {formError}
            </div>
          )}

          {/* Primary Form: Email & Password */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div>
              <label
                htmlFor="signup-email"
                className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-1.5"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError('');
                  }}
                  disabled={isSubmitting}
                  placeholder="Enter your business email"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border text-white text-sm transition-all focus:outline-none focus:ring-1 ${
                    emailError
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-slate-700/90 focus:border-blue-500 focus:ring-blue-500/20'
                  }`}
                />
              </div>
              {emailError && (
                <p className="mt-1.5 text-xs text-red-400 font-medium">
                  {emailError}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="signup-password"
                className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError('');
                  }}
                  disabled={isSubmitting}
                  placeholder="Create a password (min. 8 characters)"
                  className={`w-full pl-10 pr-11 py-3 rounded-xl bg-slate-900 border text-white text-sm transition-all focus:outline-none focus:ring-1 ${
                    passwordError
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-slate-700/90 focus:border-blue-500 focus:ring-blue-500/20'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {passwordError && (
                <p className="mt-1.5 text-xs text-red-400 font-medium">
                  {passwordError}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                id="signup-submit-button"
                type="submit"
                disabled={isSubmitting || isLoading}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-blue-500/30 flex items-center justify-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99] border border-blue-400/40"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating your account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#0b0f1a] px-3 text-slate-500 font-mono">Or</span>
            </div>
          </div>

          {/* Secondary Option: Continue with Google */}
          <button
            type="button"
            id="signup-google-button"
            onClick={handleGoogleSignup}
            disabled={isSubmitting}
            className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-700/80 hover:border-slate-600 text-xs font-semibold flex items-center justify-center gap-3 transition-colors disabled:opacity-60"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
              />
              <path
                fill="#4285F4"
                d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
              />
              <path
                fill="#FBBC05"
                d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3 0-.8.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12 0 14.8s.7 5.1 1.9 7.5l3.7-2.9c-.8-.8-1.2-1.8-1.2-2.9z"
              />
              <path
                fill="#34A853"
                d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16.5C3.7 20.2 7.5 23.5 12 23.5z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Terms & Privacy */}
          <p className="mt-6 text-center text-[11px] text-slate-400">
            By continuing, you agree to our{' '}
            <a href="#terms" className="text-slate-400 hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#privacy" className="text-slate-400 hover:underline">
              Privacy Policy
            </a>
            .
          </p>

        </div>

        {/* Link to Login */}
        <div className="text-center mt-6">
          <p className="text-sm text-slate-400">
            Already have an account?{' '}
            <Link
              to="/login"
              id="signup-to-login-link"
              className="font-semibold text-blue-400 hover:text-blue-300 hover:underline transition-colors"
            >
              Log in
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};
