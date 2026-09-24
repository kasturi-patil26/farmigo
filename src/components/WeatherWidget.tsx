import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface WeatherForecastDay {
  date: string;
  tempMax: number;
  tempMin: number;
  precipitationProbability: number;
  weatherCode: number;
  condition: string;
  icon: string;
  isRain: boolean;
}

interface WeatherData {
  source: string;
  location?: {
    name: string;
    lat: number;
    lon: number;
  };
  current?: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    weatherCode: number;
    condition: string;
    icon: string;
    isRain: boolean;
  };
  forecast?: WeatherForecastDay[];
  maxPrecipitationNext48Hours?: number;
  error?: string;
}

interface WeatherWidgetProps {
  region?: string;
  lat?: number;
  lon?: number;
  className?: string;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({
  region = 'Nashik',
  lat,
  lon,
  className = '',
}) => {
  const { t, language } = useLanguage();
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForecastDetails, setShowForecastDetails] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (typeof lat === 'number' && typeof lon === 'number') {
          queryParams.append('lat', String(lat));
          queryParams.append('lon', String(lon));
        }
        if (region) {
          queryParams.append('region', region);
        }

        const res = await fetch(`/api/weather?${queryParams.toString()}`);
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }
        const json: WeatherData = await res.json();
        if (isMounted) {
          setData(json);
        }
      } catch (err) {
        console.warn('[WEATHER WIDGET] Fetch failed:', err);
        if (isMounted) {
          setData({ source: 'unavailable', error: 'Weather data temporarily unavailable' });
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchWeather();
    return () => {
      isMounted = false;
    };
  }, [region, lat, lon]);

  // Generate dynamic human-readable advice line with simple if/else logic (fast & free, no LLM dependency)
  const getAdvisoryText = (precipProb: number): string => {
    if (precipProb >= 60) {
      if (language === 'mr') {
        return `पुढील ४८ तासांत ${precipProb}% पावसाची शक्यता — काढणी केलेले पीक ताडपत्रीने झाकून सुरक्षित ठेवा.`;
      }
      if (language === 'hi') {
        return `अगले 48 घंटों में ${precipProb}% बारिश की संभावना — कटी हुई फसल को तिरपाल से ढकने पर विचार करें।`;
      }
      return `${precipProb}% chance of rain in the next 48 hours — consider covering harvested produce with waterproof tarpaulins.`;
    }

    if (precipProb >= 30) {
      if (language === 'mr') {
        return `पुढील ४८ तासांत मध्यम पावसाची शक्यता (${precipProb}%) — माल वाहतूक आणि धान्य वाळवण्याचे वेळेवर नियोजन करा.`;
      }
      if (language === 'hi') {
        return `अगले 48 घंटों में मध्यम बारिश (${precipProb}%) की संभावना — मंडी परिवहन और सुखाने की योजना तदनुसार बनाएं।`;
      }
      return `Moderate rain probability (${precipProb}%) in the next 48 hours — plan mandi transit and drying accordingly.`;
    }

    if (language === 'mr') {
      return `कोरडे आणि निरभ्र हवामान अपेक्षित (${precipProb}% पावसाचा धोका) — काढणी, धान्य वाळवणे आणि माल वाहतुकीसाठी अनुकूल.`;
    }
    if (language === 'hi') {
      return `शुष्क और साफ मौसम की संभावना (${precipProb}% बारिश जोखिम) — फसल कटाई, सुखाने और मंडी भेजने के लिए अनुकूल परिस्थितियां।`;
    }
    return `Dry and clear weather expected (${precipProb}% rain risk) — ideal conditions for harvesting, drying, and mandi dispatch.`;
  };

  const getDayLabel = (dateStr: string, idx: number) => {
    if (idx === 0) {
      return language === 'mr' ? 'आज' : language === 'hi' ? 'आज' : 'Today';
    }
    if (idx === 1) {
      return language === 'mr' ? 'उद्या' : language === 'hi' ? 'कल' : 'Tomorrow';
    }
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString(language === 'mr' ? 'mr-IN' : language === 'hi' ? 'hi-IN' : 'en-US', {
        weekday: 'short',
      });
    } catch {
      return dateStr;
    }
  };

  if (loading) {
    return (
      <div className={`w-full bg-[#FFFDF8] rounded-2xl border-2 border-[#E2D7C1] p-4 flex items-center justify-between gap-4 shadow-xs animate-pulse ${className}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
            <span className="material-symbols-outlined text-2xl animate-spin">progress_activity</span>
          </div>
          <div>
            <div className="h-3.5 w-28 bg-slate-200 rounded mb-1.5" />
            <div className="h-3 w-48 bg-slate-100 rounded" />
          </div>
        </div>
        <span className="text-xs font-medium text-slate-400 font-body">
          {t.weatherRainAlert}
        </span>
      </div>
    );
  }

  // Fallback to clearly labeled generic message if Open-Meteo call fails
  if (!data || data.source === 'unavailable' || !data.current) {
    return (
      <div className={`w-full bg-[#FFFDF8] rounded-2xl border-2 border-slate-200 p-4 flex items-center justify-between gap-4 shadow-xs ${className}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
            <span className="material-symbols-outlined text-xl">cloud_off</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700 font-heading">
                {t.weatherAdvisory}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200">
                Offline
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium font-body mt-0.5">
              {t.weatherUnavailable}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const current = data.current;
  const precipProb = Number(data.maxPrecipitationNext48Hours ?? 0);
  const isRainLikely = precipProb >= 40;
  const advisoryText = getAdvisoryText(precipProb);

  return (
    <div className={`w-full bg-[#FFFDF8] rounded-2xl border-2 ${isRainLikely ? 'border-amber-300 bg-amber-50/20' : 'border-[#E2D7C1]'} p-4 md:p-5 shadow-xs transition-all relative overflow-hidden ${className}`}>
      {/* Top subtle indicator bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${isRainLikely ? 'bg-amber-500' : 'bg-[#2F5233]'}`} />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Weather condition, Icon, Temp */}
        <div className="flex items-center gap-3.5">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border-2 shadow-2xs ${
            isRainLikely
              ? 'bg-amber-100/70 border-amber-300 text-amber-800'
              : 'bg-emerald-50 border-emerald-200 text-emerald-800'
          }`}>
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              {current.isRain || isRainLikely ? 'rainy' : (current.icon || 'sunny')}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold font-mono-price uppercase tracking-wider text-[#2F5233]">
                {data.location?.name || region} • {t.liveWeather}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Open-Meteo
              </span>
            </div>

            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl md:text-3xl font-black text-[#2B2016] font-mono-price">
                {current.temperature}°C
              </span>
              <span className="text-xs font-bold text-slate-600 font-body">
                {current.condition}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                • {current.humidity}% {language === 'mr' ? 'आद्रता' : language === 'hi' ? 'आर्द्रता' : 'Humidity'}
              </span>
            </div>
          </div>
        </div>

        {/* Center/Right: Rain Probability badge & Advisory Line */}
        <div className="flex-1 md:max-w-xl flex flex-col md:items-end justify-center">
          <div className="flex items-center gap-2 mb-1">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono-price border ${
              isRainLikely
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : 'bg-emerald-100/70 text-emerald-900 border-emerald-200'
            }`}>
              <span className="material-symbols-outlined text-sm">
                {isRainLikely ? 'water_drop' : 'wb_sunny'}
              </span>
              <span>{t.rainProbability}: {precipProb}%</span>
            </span>

            {data.forecast && data.forecast.length > 0 && (
              <button
                type="button"
                onClick={() => setShowForecastDetails((prev) => !prev)}
                className="text-[11px] font-bold text-[#2F5233] hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                <span>{showForecastDetails ? (language === 'mr' ? 'तपशील लपवा' : language === 'hi' ? 'विवरण छुपाएं' : 'Hide') : (language === 'mr' ? '३-दिवसीय अंदाज' : language === 'hi' ? '3-दिवसीय पूर्वानुमान' : '3-Day')}</span>
                <span className="material-symbols-outlined text-sm">
                  {showForecastDetails ? 'expand_less' : 'expand_more'}
                </span>
              </button>
            )}
          </div>

          <p className="text-xs md:text-[13px] font-semibold text-[#2B2016] leading-snug text-left md:text-right font-body">
            {advisoryText}
          </p>
        </div>
      </div>

      {/* Expandable 3-Day Forecast Strip */}
      {showForecastDetails && data.forecast && data.forecast.length > 0 && (
        <div className="mt-4 pt-3 border-t border-[#E2D7C1] grid grid-cols-3 gap-2 animate-fade-in">
          {data.forecast.map((day, idx) => (
            <div
              key={day.date}
              className="p-2.5 rounded-xl bg-white/80 border border-[#E2D7C1] flex flex-col items-center text-center"
            >
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {getDayLabel(day.date, idx)}
              </span>
              <span className={`material-symbols-outlined text-xl my-1 ${day.isRain ? 'text-blue-600' : 'text-amber-500'}`}>
                {day.icon || (day.isRain ? 'rainy' : 'sunny')}
              </span>
              <div className="text-xs font-black text-slate-800 font-mono-price">
                {day.tempMax}° / {day.tempMin}°
              </div>
              <span className="text-[10px] font-bold text-slate-500 mt-0.5">
                {day.precipitationProbability}% {language === 'mr' ? 'पाऊस' : language === 'hi' ? 'बारिश' : 'Rain'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
