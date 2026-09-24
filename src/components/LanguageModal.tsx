import React from 'react';
import { LanguageCode } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LanguageModal: React.FC<LanguageModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { language, setLanguage, t } = useLanguage();
  if (!isOpen) return null;

  const languages: Array<{ code: LanguageCode; label: string; native: string; desc: string }> = [
    { code: 'en', label: 'English', native: 'English', desc: 'National e-NAM standard & reporting' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी', desc: 'राष्ट्रीय एवं क्षेत्रीय मंडी भाषा' },
    { code: 'mr', label: 'Marathi', native: 'मराठी', desc: 'महाराष्ट्र राज्य बाजार समिती भाषा' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-[2.5rem] w-full max-w-md shadow-2xl border-2 border-slate-200 overflow-hidden">
        <div className="p-6 border-b-2 border-slate-100 flex justify-between items-center bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">language</span>
            </div>
            <div>
              <h3 className="font-bold text-base tracking-tight">{t.selectLanguage}</h3>
              <p className="text-xs text-slate-300 font-medium">Choose your primary UI dialect</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        <div className="p-6 space-y-3">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLanguage(l.code);
                onClose();
              }}
              className={`w-full p-4 rounded-2xl border-2 text-left flex items-center justify-between transition-all cursor-pointer ${
                language === l.code
                  ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800'
              }`}
            >
              <div>
                <span className="text-base font-black block">{l.native}</span>
                <span className="text-xs text-slate-500 font-medium">{l.label} • {l.desc}</span>
              </div>
              {language === l.code && (
                <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-base">check</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
