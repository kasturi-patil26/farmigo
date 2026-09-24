import React, { useState } from 'react';
import { FarmerTab, AuthUser } from '../types';
import { INITIAL_FPOS } from '../data/fpoData';
import { PRODUCE_FEED } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { DemoDataBadge } from './DemoDataBadge';

interface FPOHubProps {
  onNavigate: (tab: FarmerTab) => void;
  currentUser: AuthUser | null;
  onJoinFPO: (fpoId: string) => void;
}

export const FPOHub: React.FC<FPOHubProps> = ({ onNavigate, currentUser, onJoinFPO }) => {
  const { t } = useLanguage();
  const [districtFilter, setDistrictFilter] = useState('All');

  const districts = ['All', ...Array.from(new Set(INITIAL_FPOS.map((f) => f.district)))];
  const filteredFpos =
    districtFilter === 'All' ? INITIAL_FPOS : INITIAL_FPOS.filter((f) => f.district === districtFilter);

  const joinedFpo = currentUser?.fpoId
    ? INITIAL_FPOS.find((f) => f.id === currentUser.fpoId)
    : null;

  // If the logged-in farmer is this FPO's office bearer (matched by phone for MVP simplicity),
  // show a small read-only aggregation summary.
  const isOfficeBearer =
    joinedFpo && currentUser?.mobile && joinedFpo.officeBearerPhone === currentUser.mobile;
  const pooledMembers = joinedFpo
    ? PRODUCE_FEED.filter((p) => p.fpoId === joinedFpo.id)
    : [];
  const totalPooledTons = pooledMembers.reduce((sum, p) => sum + p.quantityTons, 0);

  return (
    <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-8 py-6 md:py-8 mb-20 md:mb-8 bg-[#F7F1E3]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <DemoDataBadge type="simulated" />
          </div>
          <h1 className="text-2xl md:text-4xl font-black text-[#2B2016] tracking-tight font-heading">
            {t.fpoHubTitle}
          </h1>
          <p className="text-sm md:text-base text-[#6E5D4F] font-medium mt-1 font-body max-w-2xl">
            {t.fpoHubSubtitle}
          </p>
        </div>
        <button
          onClick={() => onNavigate('home')}
          className="px-5 py-3 bg-[#FFFDF8] hover:bg-[#E2D7C1]/50 text-[#2B2016] rounded-full font-heading font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer border-2 border-[#E2D7C1]"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          {t.back}
        </button>
      </div>

      {!joinedFpo && (
        <div className="mb-6 p-4 bg-[#D9A441]/10 border-2 border-[#D9A441]/30 rounded-2xl text-sm text-[#976D1F] font-medium font-body">
          {t.fpoNoFpoJoined}
        </div>
      )}

      {joinedFpo && (
        <div className="mb-6 p-6 bg-[#2F5233]/5 border-2 border-[#2F5233]/30 rounded-3xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-[#2F5233]">groups</span>
            <h3 className="font-black text-[#2B2016] font-heading">{joinedFpo.name}</h3>
            <span className="text-xs font-bold text-[#2F5233] bg-[#2F5233]/10 border border-[#2F5233]/30 px-2 py-0.5 rounded-full">
              {t.fpoJoinedBadge}
            </span>
          </div>
          <p className="text-xs text-[#6E5D4F] font-body">
            {t.fpoOfficeBearer}: {joinedFpo.officeBearerName} • {joinedFpo.officeBearerPhone}
          </p>

          {isOfficeBearer && (
            <div className="mt-4 pt-4 border-t-2 border-dashed border-[#2F5233]/20">
              <h4 className="text-sm font-black text-[#2B2016] font-heading mb-2">{t.fpoDashboardTitle}</h4>
              <p className="text-xs text-[#6E5D4F] font-body mb-1">
                {t.fpoTotalPooled}: <strong className="text-[#2F5233]">{totalPooledTons} Tons</strong> ({pooledMembers.length} listings)
              </p>
              <ul className="text-xs text-[#6E5D4F] font-body list-disc list-inside">
                {pooledMembers.map((p) => (
                  <li key={p.id}>{p.farmerName} — {p.quantityTons} Tons ({p.cropType})</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mb-4 flex items-center gap-3">
        <label className="text-xs font-bold text-[#6E5D4F] uppercase tracking-wider font-body">
          {t.fpoSearchByDistrict}
        </label>
        <select
          value={districtFilter}
          onChange={(e) => setDistrictFilter(e.target.value)}
          className="px-4 py-2 rounded-full border-2 border-[#E2D7C1] bg-[#FFFDF8] text-sm font-bold text-[#2B2016] font-body"
        >
          {districts.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredFpos.map((fpo) => (
          <div
            key={fpo.id}
            className="bg-[#FFFDF8] border-2 border-[#E2D7C1] rounded-3xl p-6 flex flex-col justify-between shadow-xs"
          >
            <div>
              <h3 className="font-black text-[#2B2016] font-heading text-lg">{fpo.name}</h3>
              <p className="text-xs text-[#6E5D4F] font-body mt-1">{fpo.district} • Reg. {fpo.registrationNumber}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {fpo.primaryCrops.map((c) => (
                  <span key={c} className="text-[10px] font-bold text-[#2F5233] bg-[#2F5233]/10 border border-[#2F5233]/20 px-2 py-0.5 rounded-full">
                    {c}
                  </span>
                ))}
              </div>
              <p className="text-xs text-[#6E5D4F] font-body mt-3">
                {t.fpoMemberCount}: <strong className="text-[#2B2016]">{fpo.memberCount}</strong>
              </p>
              <p className="text-xs text-[#6E5D4F] font-body">
                {t.fpoOfficeBearer}: {fpo.officeBearerName}
              </p>
            </div>
            <button
              onClick={() => onJoinFPO(fpo.id)}
              disabled={currentUser?.fpoId === fpo.id}
              className={`mt-4 py-2.5 rounded-full font-bold text-xs font-heading transition-colors ${
                currentUser?.fpoId === fpo.id
                  ? 'bg-[#2F5233]/10 text-[#2F5233] cursor-default'
                  : 'bg-[#2F5233] hover:bg-[#254228] text-white cursor-pointer'
              }`}
            >
              {currentUser?.fpoId === fpo.id ? t.fpoJoinedBadge : t.fpoJoinButton}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};
