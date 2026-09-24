import React, { useState } from 'react';
import { UserRole, FarmerTab, BuyerOffer, ProduceItem, AuthUser } from './types';
import { DEMO_USERS } from './data/mockData';
import { useLanguage } from './context/LanguageContext';
import { Header } from './components/Header';
import { RoleSelection } from './components/RoleSelection';
import { FarmerDashboard } from './components/FarmerDashboard';
import { FarmerMarketPrices } from './components/FarmerMarketPrices';
import { FarmerAddProduce } from './components/FarmerAddProduce';
import { FarmerAIPrediction } from './components/FarmerAIPrediction';
import { FarmerSellRecommendations } from './components/FarmerSellRecommendations';
import { FarmerBuyerOffers } from './components/FarmerBuyerOffers';
import { FarmerStore } from './components/FarmerStore';
import { FarmerSalesTracking } from './components/FarmerSalesTracking';
import { FarmerProfile } from './components/FarmerProfile';
import { WarehouseFinder } from './components/WarehouseFinder';
import { FarmerBottomNav } from './components/FarmerBottomNav';
import { MerchantDashboard } from './components/MerchantDashboard';
import { GovernmentPortal } from './components/GovernmentPortal';
import { AskAIModal } from './components/AskAIModal';
import { TransportModal } from './components/TransportModal';
import { PostRequirementModal } from './components/PostRequirementModal';
import { LanguageModal } from './components/LanguageModal';
import { GovernmentInsightsModal } from './components/GovernmentInsightsModal';
import { AuthModal } from './components/AuthModal';
import { FPOHub } from './components/FPOHub';

export default function App() {
  const { t } = useLanguage();
  const [currentRole, setCurrentRole] = useState<UserRole>('role-selection');
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [farmerTab, setFarmerTab] = useState<FarmerTab>('home');

  // FPO join handler — sets fpoId on the current user's local profile state.
  const handleJoinFpo = (fpoId: string) => {
    setCurrentUser((prev) => (prev ? { ...prev, fpoId } : prev));
  };

  // Modals
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [targetAuthRole, setTargetAuthRole] = useState<'farmer' | 'merchant' | 'government'>('farmer');
  const [isAskAIOpen, setIsAskAIOpen] = useState(false);
  const [isTransportOpen, setIsTransportOpen] = useState(false);
  const [transportData, setTransportData] = useState<{ mandi: string; qty: number; netIncome: number } | null>(null);
  const [isPostReqOpen, setIsPostReqOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isGovInsightsOpen, setIsGovInsightsOpen] = useState(false);
  const [selectedProduceForBid, setSelectedProduceForBid] = useState<ProduceItem | null>(null);
  const [bidAmount, setBidAmount] = useState<number>(2300);
  const [bidSuccessMessage, setBidSuccessMessage] = useState<string | null>(null);

  const handleRoleSelect = (role: 'farmer' | 'merchant' | 'government') => {
    setTargetAuthRole(role);
    setIsAuthOpen(true);
  };

  const handleLoginSuccess = (user: AuthUser) => {
    setCurrentUser(user);
    setCurrentRole(user.role);
    setIsAuthOpen(false);
    if (user.role === 'farmer') {
      setFarmerTab('home');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentRole('role-selection');
  };

  const handleOpenTransport = (data: { mandi: string; qty: number; netIncome: number }) => {
    setTransportData(data);
    setIsTransportOpen(true);
  };

  const handlePlaceBid = (item: ProduceItem) => {
    setSelectedProduceForBid(item);
    setBidAmount(item.pricePerQuintal + 50);
  };

  const handleConfirmBid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduceForBid) return;
    setBidSuccessMessage(`Bid of ₹${bidAmount}/qtl placed for ${selectedProduceForBid.title}! Direct APMC contract created.`);
    setTimeout(() => {
      setSelectedProduceForBid(null);
      setBidSuccessMessage(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-indigo-100 selection:text-indigo-900 font-sans">
      {/* Top Header */}
      <Header
        currentRole={currentRole}
        currentUser={currentUser}
        onSelectRole={(role) => {
          setCurrentRole(role);
          if (role === 'role-selection') {
            setCurrentUser(null);
          }
        }}
        onLogout={handleLogout}
        onOpenLanguageModal={() => setIsLanguageOpen(true)}
        farmerTab={farmerTab}
        onFarmerTabChange={setFarmerTab}
        onOpenAskAI={() => setIsAskAIOpen(true)}
      />

      {/* Main Role / Screen Router */}
      <div className="flex-1 flex flex-col">
        {currentRole === 'role-selection' && (
          <RoleSelection onSelectRole={handleRoleSelect} />
        )}

        {currentRole === 'farmer' && (
          <div className="flex-1 flex flex-col">
            {/* Farmer sub-views */}
            {farmerTab === 'home' && (
              <FarmerDashboard
                onNavigate={setFarmerTab}
                onOpenAskAI={() => setIsAskAIOpen(true)}
              />
            )}

            {farmerTab === 'markets' && (
              <FarmerMarketPrices
                onNavigate={setFarmerTab}
                onOpenTransportModal={handleOpenTransport}
              />
            )}

            {farmerTab === 'sell' && (
              <FarmerAddProduce
                onNavigate={setFarmerTab}
                currentUser={currentUser}
                onProduceAdded={(crop, qty, grade, loc, fpoId) => {
                  console.log('Produce Added:', { crop, qty, grade, loc, fpoId });
                }}
              />
            )}

            {farmerTab === 'fpo' && (
              <FPOHub
                onNavigate={setFarmerTab}
                currentUser={currentUser}
                onJoinFPO={handleJoinFpo}
              />
            )}

            {farmerTab === 'ai-assistant' && (
              <FarmerAIPrediction
                onNavigate={setFarmerTab}
                onOpenAskAI={() => setIsAskAIOpen(true)}
                currentUser={currentUser}
              />
            )}

            {farmerTab === 'sell-recommendations' && (
              <FarmerSellRecommendations
                onNavigate={setFarmerTab}
                onInitiateSale={(mandi) => {
                  console.log('Initiated sale at:', mandi);
                }}
              />
            )}

            {farmerTab === 'buyer-offers' && (
              <FarmerBuyerOffers
                onNavigate={setFarmerTab}
                onAcceptOffer={(offer: BuyerOffer) => {
                  alert(`Offer from ${offer.buyerName} accepted for ₹${offer.offeredPrice}/Q! Digital Contract #KRT-${offer.id} generated.`);
                }}
              />
            )}

            {farmerTab === 'farm-store' && (
              <FarmerStore
                onNavigate={setFarmerTab}
              />
            )}

            {farmerTab === 'sales-tracking' && (
              <FarmerSalesTracking
                onNavigate={setFarmerTab}
              />
            )}

            {farmerTab === 'storage' && (
              <main className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8 flex flex-col gap-6 md:gap-8 pb-24 md:pb-8 bg-[#F7F1E3]">
                <WarehouseFinder
                  farmerLocation={currentUser?.location || 'Nashik, MH'}
                  onNavigate={setFarmerTab}
                />
              </main>
            )}

            {farmerTab === 'profile' && (
              <FarmerProfile
                onNavigate={setFarmerTab}
                onSwitchRole={setCurrentRole}
              />
            )}

            {/* Mobile Bottom Navigation */}
            <FarmerBottomNav
              activeTab={farmerTab}
              onTabChange={setFarmerTab}
            />
          </div>
        )}

        {currentRole === 'merchant' && (
          <MerchantDashboard
            onOpenPostRequirement={() => setIsPostReqOpen(true)}
            onPlaceBid={handlePlaceBid}
          />
        )}

        {currentRole === 'government' && (
          <GovernmentPortal
            onSwitchRole={() => {
              setCurrentRole('role-selection');
              setCurrentUser(null);
            }}
            onOpenAIInsights={() => setIsGovInsightsOpen(true)}
          />
        )}
      </div>

      {/* Floating Ask AI Button (For Farmer & Merchant roles on desktop) */}
      {currentRole !== 'role-selection' && (
        <button
          onClick={() => setIsAskAIOpen(true)}
          className="fixed bottom-6 right-6 hidden md:flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-4 rounded-2xl shadow-xl shadow-indigo-200 border-2 border-indigo-500/30 active:scale-95 transition-all z-40 cursor-pointer group"
          title="Open FarmiGo AI Agronomist & Advisory"
        >
          <div className="w-8 h-8 rounded-xl bg-white/20 text-white flex items-center justify-center group-hover:rotate-12 transition-transform">
            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              psychology
            </span>
          </div>
          <span className="font-bold text-sm tracking-tight">{t.askKrushiAI}</span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
        </button>
      )}

      {/* Auth Demo Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        targetRole={targetAuthRole}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onSwitchRoleClick={() => {
          setIsAuthOpen(false);
          setCurrentRole('role-selection');
        }}
      />

      {/* Ask AI Chat Modal */}
      <AskAIModal
        isOpen={isAskAIOpen}
        onClose={() => setIsAskAIOpen(false)}
        role={currentRole === 'merchant' ? 'Merchant' : currentRole === 'government' ? 'Government Official' : 'Farmer'}
        currentUser={currentUser}
      />

      {/* Transport & Mandi Slot Modal */}
      <TransportModal
        isOpen={isTransportOpen}
        onClose={() => {
          setIsTransportOpen(false);
          setTransportData(null);
        }}
        data={transportData}
      />

      {/* Post Requirement Modal */}
      <PostRequirementModal
        isOpen={isPostReqOpen}
        onClose={() => setIsPostReqOpen(false)}
        onSubmitSuccess={() => {
          alert('Procurement requirement published to regional farmer network.');
        }}
      />

      {/* Language Switcher Modal */}
      <LanguageModal
        isOpen={isLanguageOpen}
        onClose={() => setIsLanguageOpen(false)}
      />

      {/* Government AI Macro Insights Modal */}
      <GovernmentInsightsModal
        isOpen={isGovInsightsOpen}
        onClose={() => setIsGovInsightsOpen(false)}
      />

      {/* Merchant Place Bid Modal */}
      {selectedProduceForBid && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl border-2 border-slate-200 overflow-hidden">
            <div className="p-5 border-b-2 border-slate-100 flex justify-between items-center bg-slate-900 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">request_quote</span>
                </div>
                <div>
                  <h3 className="font-bold text-base tracking-tight">Place Direct Purchase Bid</h3>
                  <p className="text-xs text-slate-300 font-medium">{selectedProduceForBid.title}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedProduceForBid(null)}
                className="p-1 hover:bg-white/10 rounded-xl text-white transition-colors"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {bidSuccessMessage ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 border-2 border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-3xl">check</span>
                </div>
                <p className="font-bold text-sm text-slate-900">{bidSuccessMessage}</p>
              </div>
            ) : (
              <form onSubmit={handleConfirmBid} className="p-6 space-y-5">
                <div className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-100 text-xs space-y-1.5 text-slate-600">
                  <p><strong className="text-slate-900">Farmer:</strong> {selectedProduceForBid.farmerName}</p>
                  <p><strong className="text-slate-900">Location:</strong> {selectedProduceForBid.location}</p>
                  <p><strong className="text-slate-900">Available:</strong> {selectedProduceForBid.quantityTons} Tons • Grade {selectedProduceForBid.grade}</p>
                  <p><strong className="text-slate-900">Base Rate:</strong> ₹{selectedProduceForBid.pricePerQuintal}/qtl</p>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">
                    Your Bid Price (₹ / Quintal)
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setBidAmount((b) => Math.max(1000, b - 50))}
                      className="w-12 h-12 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xl transition-colors"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(Number(e.target.value) || 0)}
                      className="flex-1 h-12 text-center rounded-2xl bg-slate-50 border-2 border-slate-200 font-bold text-xl text-slate-900 focus:outline-none focus:border-indigo-600"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setBidAmount((b) => b + 50)}
                      className="w-12 h-12 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xl transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t-2 border-slate-100 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedProduceForBid(null)}
                    className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-2xl shadow-lg shadow-indigo-100 transition-all"
                  >
                    Submit Binding Bid
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
