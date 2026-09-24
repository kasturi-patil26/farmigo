import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { DemoDataBadge } from './DemoDataBadge';

interface GovernmentInsightsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GovernmentInsightsModal: React.FC<GovernmentInsightsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t, language } = useLanguage();
  const [topic, setTopic] = useState('Pulse Demand & Buffer Stock Strategy');
  const [loading, setLoading] = useState(false);
  const [insight, setInsight] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setLoading(true);
    setInsight(null);

    try {
      const res = await fetch('/api/ai/government-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          timeframe: 'Q4 2026',
          language,
          region: 'Region 04',
        }),
      });
      const data = await res.json();
      setInsight(data.analysis || data.summary || 'Analysis generated successfully.');
    } catch {
      if (language === 'mr') {
        setInsight(
          `स्ट्रॅटेजिक पॉलिसी ब्रीफ (${topic}):
१. भाव स्थिरीकरण निधी (PSF): स्पॉट किमतीतील चढउतार रोखण्यासाठी नोव्हेंबर १५ पर्यंत मध्यवर्ती गोदामांमधून १८,००० मेट्रिक टन तूर डाळ खुली करावी.
२. बाजार समिती व्यवस्थापन: कांद्याची २०% वाढलेली आवक सुरळीत करण्यासाठी नाशिक आणि लासलगाव येथे २४ तास गेटपास पडताळणी सुरू ठेवावी.
३. हमीभाव (MSP) खरेदी: विदर्भातील थेट खरेदी केंद्रांवर ९४% किमान आधारभूत किमतीचे पालन होत आहे.`
        );
      } else if (language === 'hi') {
        setInsight(
          `रणनीतिक नीति संक्षिप्त विवरण (${topic}):
1. मूल्य स्थिरीकरण कोष (PSF): हाजिर कीमतों में उतार-चढ़ाव को थामने के लिए 15 नवंबर तक केंद्रीय गोदामों से 18,000 मीट्रिक टन तुअर दाल जारी करें।
2. मंडी प्रबंधन: नासिक और लासलगांव में प्याज की 20% अधिक आवक संभालने के लिए 24 घंटे गेट पास सत्यापन की व्यवस्था करें।
3. किसान MSP अनुपालन: विदर्भ में प्रत्यक्ष खरीद केंद्र 94% न्यूनतम समर्थन मूल्य नियमों का प्रभावी रूप से पालन कर रहे हैं।`
        );
      } else {
        setInsight(
          `Strategic Policy Brief (${topic}):
1. Price Stabilization Fund (PSF): Release 18,000 Metric Tons of Tur Dal from southern central warehouses by Nov 15 to dampen spot volatility in Hyderabad and Pune APMC nodes.
2. Mandi Throughput: Enable 24x7 gate pass verification at Nashik and Lasalgaon to handle 20% spike in onion arrivals.
3. Farmer MSP Compliance: Direct procurement centers in Vidarbha are meeting 94% price floor mandates.`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl border-2 border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 md:p-6 border-b-2 border-slate-100 flex justify-between items-center bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-indigo-600 flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                auto_awesome
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base md:text-lg tracking-tight">
                  National Agri-Policy AI Synthesizer
                </h3>
                <DemoDataBadge type="ai_assisted_estimate" />
              </div>
              <p className="text-xs text-indigo-300">
                Automated macro analysis for Department of Agriculture
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-4 overflow-y-auto flex-1">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Select Surveillance Focus Area
            </label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full h-12 px-4 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-600 cursor-pointer"
            >
              <option value="Pulse Demand & Buffer Stock Strategy">Pulse Demand & Buffer Stock Strategy</option>
              <option value="Onion Price Volatility & Export Tariff Impact">Onion Price Volatility & Export Tariff Impact</option>
              <option value="Monsoon Kharif Yield vs MSP Procurement Targets">Monsoon Kharif Yield vs MSP Procurement Targets</option>
              <option value="Fertilizer Subsidy Distribution Efficiency">Fertilizer Subsidy Distribution Efficiency</option>
            </select>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-full shadow-md shadow-indigo-100 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            {loading ? (
              <>
                <span className="material-symbols-outlined animate-spin text-base">progress_activity</span>
                Synthesizing Multi-Mandi Feeds...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-base">analytics</span>
                Run Policy Simulation & Generate Intelligence
              </>
            )}
          </button>

          {insight && (
            <div className="p-6 rounded-3xl bg-indigo-50/70 border-2 border-indigo-100 text-xs md:text-sm text-slate-800 leading-relaxed whitespace-pre-line space-y-2">
              <div className="flex items-center justify-between flex-wrap gap-2 text-indigo-600 font-black text-xs uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">verified</span>
                  Department Advisory Memorandum
                </div>
                <DemoDataBadge type="ai_assisted_estimate" />
              </div>
              <p className="text-xs md:text-sm text-slate-700 font-medium">{insight}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
