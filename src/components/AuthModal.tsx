import React, { useState, useEffect } from 'react';
import { UserRole, AuthUser } from '../types';
import { DEMO_USERS } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

interface AuthModalProps {
  isOpen: boolean;
  targetRole: 'farmer' | 'merchant' | 'government';
  onClose: () => void;
  onLoginSuccess: (user: AuthUser) => void;
  onSwitchRoleClick: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  targetRole,
  onClose,
  onLoginSuccess,
  onSwitchRoleClick,
}) => {
  const { t } = useLanguage();
  const demoUser = DEMO_USERS[targetRole];

  const [step, setStep] = useState<'credentials' | 'otp'>('credentials');
  const [mobile, setMobile] = useState('');
  const [badgeId, setBadgeId] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setStep('credentials');
      setMobile(demoUser.mobile);
      setBadgeId(demoUser.badgeId);
      setOtp('123456');
      setErrorMsg(null);
    }
  }, [isOpen, targetRole]);

  if (!isOpen) return null;

  const handleAutoFill = () => {
    setMobile(demoUser.mobile);
    setBadgeId(demoUser.badgeId);
    setErrorMsg(null);
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobile.trim()) {
      setErrorMsg('Please enter a valid mobile number');
      return;
    }
    setLoading(true);
    setErrorMsg(null);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 400);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) {
      setErrorMsg('Please enter the 6-digit OTP');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess(demoUser);
    }, 400);
  };

  const getRoleHeaderInfo = () => {
    switch (targetRole) {
      case 'farmer':
        return {
          icon: 'agriculture',
          title: t.farmer,
          badge: t.krushiId,
          badgeVal: demoUser.badgeId,
          color: 'from-emerald-600 to-teal-700',
        };
      case 'merchant':
        return {
          icon: 'storefront',
          title: t.merchant,
          badge: t.apmcLicense,
          badgeVal: demoUser.badgeId,
          color: 'from-slate-800 to-slate-950',
        };
      case 'government':
        return {
          icon: 'shield_person',
          title: t.government,
          badge: t.govBadgeId,
          badgeVal: demoUser.badgeId,
          color: 'from-indigo-600 to-indigo-800',
        };
    }
  };

  const info = getRoleHeaderInfo();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl border-2 border-slate-200 overflow-hidden flex flex-col relative">
        {/* Top Header Card */}
        <div className={`p-6 md:p-8 bg-gradient-to-br ${info.color} text-white relative overflow-hidden`}>
          <div className="absolute right-0 top-0 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex justify-between items-start relative z-10 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                <span className="material-symbols-outlined text-2xl">{info.icon}</span>
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-widest font-mono font-bold text-white/80 block">
                  {t.loginTitle}
                </span>
                <h3 className="text-xl md:text-2xl font-black tracking-tight">{info.title}</h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-medium w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{t.demoModeBadge}: {demoUser.name}</span>
          </div>
        </div>

        {/* Demo Mode Notice Banner */}
        <div className="bg-indigo-50 border-b border-indigo-100 px-6 py-2.5 flex items-center justify-between text-xs text-indigo-900 font-medium">
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-indigo-600">verified</span>
            {t.demoModeNotice}
          </span>
          <button
            onClick={handleAutoFill}
            className="text-indigo-600 font-bold hover:underline cursor-pointer"
          >
            {t.autoFillDemo}
          </button>
        </div>

        {/* Content Form */}
        <div className="p-6 md:p-8 flex-1">
          {errorMsg && (
            <div className="mb-5 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-2">
              <span className="material-symbols-outlined text-base text-rose-600">error</span>
              {errorMsg}
            </div>
          )}

          {step === 'credentials' ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                  {t.mobileLabel}
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="98765 43210"
                    maxLength={10}
                    className="w-full h-12 pl-12 pr-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:border-indigo-600"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                  {info.badge}
                </label>
                <input
                  type="text"
                  value={badgeId}
                  onChange={(e) => setBadgeId(e.target.value)}
                  placeholder="KID-MH-98421"
                  className="w-full h-12 px-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:border-indigo-600"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-bold text-sm rounded-full transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-base">progress_activity</span>
                      {t.loading}
                    </>
                  ) : (
                    <>
                      <span>{t.sendOtp}</span>
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </>
                  )}
                </button>
              </div>

              <div className="pt-2 flex justify-between items-center text-xs">
                <button
                  type="button"
                  onClick={onSwitchRoleClick}
                  className="text-slate-500 hover:text-indigo-600 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">swap_horiz</span>
                  {t.switchRole}
                </button>
                <button
                  type="button"
                  onClick={handleAutoFill}
                  className="text-indigo-600 font-bold hover:underline cursor-pointer"
                >
                  {t.autoFillDemo} ({demoUser.name})
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div className="text-center">
                <p className="text-xs text-slate-500 font-medium">
                  {t.otpCodeLabel}: <strong className="text-slate-900 font-bold">+91 {mobile}</strong>
                </p>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block text-center mb-2">
                  {t.enterOtp}
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  placeholder="1 2 3 4 5 6"
                  className="w-full h-14 text-center tracking-[0.6em] text-2xl font-black text-slate-900 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-indigo-600 font-mono"
                  required
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep('credentials')}
                  className="flex-1 h-12 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-full transition-colors cursor-pointer"
                >
                  {t.back}
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-2 h-12 bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-bold text-xs rounded-full transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-base">progress_activity</span>
                      {t.loading}
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-base">check_circle</span>
                      {t.verifyOtp}
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Prototype Security Disclaimer */}
          <div className="mt-6 pt-4 border-t-2 border-slate-100 text-center">
            <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
              {t.authDisclaimer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
