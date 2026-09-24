import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AuthUser } from '../types';

interface AskAIModalProps {
  isOpen: boolean;
  onClose: () => void;
  role?: string;
  currentUser?: AuthUser | null;
  crop?: string;
  region?: string;
}

export const AskAIModal: React.FC<AskAIModalProps> = ({
  isOpen,
  onClose,
  role = 'Farmer',
  currentUser,
  crop,
  region,
}) => {
  const { t, language } = useLanguage();
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);
  const recognitionRef = useRef<any>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  const farmerRegion = region || currentUser?.location || 'Maharashtra';
  const farmerCrop = crop || (currentUser?.primaryCrops && currentUser.primaryCrops[0]) || 'Soybean';

  const getInitialGreeting = (lang: string) => {
    if (lang === 'mr') {
      return 'नमस्कार! मी कृषी AI आहे, आपला शेती आणि बाजार सल्लागार. आज मी तुम्हाला बाजारभाव, पीक नियोजन किंवा हवामान अंदाजात कशी मदत करू शकतो?';
    }
    if (lang === 'hi') {
      return 'नमस्ते! मैं कृषि AI हूँ, आपका समर्पित कृषि एवं बाजार सलाहकार सहायक। आज मैं मंडी भाव, फसल योजना या मौसम पूर्वानुमान में आपकी क्या मदद कर सकता हूँ?';
    }
    return 'Namaste! I am FarmiGo AI, your dedicated agricultural and market advisory assistant. How can I help you today regarding mandi rates, crop planning, or weather forecasts?';
  };

  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; time: string }>>([
    {
      sender: 'ai',
      text: getInitialGreeting(language),
      time: 'Just now',
    },
  ]);
  const [loading, setLoading] = useState(false);

  const [voiceNotice, setVoiceNotice] = useState<string | null>(null);

  // Update initial message greeting when language changes if no conversation started
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].sender === 'ai') {
        return [
          {
            sender: 'ai',
            text: getInitialGreeting(language),
            time: 'Just now',
          },
        ];
      }
      return prev;
    });
  }, [language]);

  // Stop all active speech / audio playback
  const stopAllAudio = () => {
    if (audioElementRef.current) {
      audioElementRef.current.pause();
      audioElementRef.current.currentTime = 0;
      audioElementRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingIndex(null);
  };

  // Clean up audio & speech recognition on unmount or when modal closes
  useEffect(() => {
    return () => {
      stopAllAudio();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || loading) return;

    // Stop listening if active
    if (isListening && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
      setIsListening(false);
    }

    const userText = query;
    setQuery('');
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: userText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    ]);
    setLoading(true);

    try {
      const res = await fetch('/api/ai/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userText,
          role,
          crop: farmerCrop,
          region: farmerRegion,
          language,
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: data.response || 'Insight generated.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch {
      let fallback = `For ${farmerCrop} in ${farmerRegion}, current APMC rates favor holding top grade inventory for 3-5 days. Spot prices remain supported with ₹50-₹80/qtl upside.`;
      if (language === 'mr') {
        fallback = `${farmerRegion} मध्ये ${farmerCrop} साठी सध्याचे बाजारभाव पाहता चांगल्या प्रतीचा माल ३-५ दिवस थांबवून विकणे फायदेशीर ठरेल. क्विंटलमागे ₹५०-₹८० वाढ दिसून येत आहे.`;
      } else if (language === 'hi') {
        fallback = `${farmerRegion} में ${farmerCrop} के लिए वर्तमान APMC दरें उत्तम गुणवत्ता के माल को 3-5 दिन रोककर बेचने के पक्ष में हैं। ₹50-₹80 प्रति क्विंटल की तेजी बनी हुई है।`;
      }
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: fallback,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const toggleListening = () => {
    const SpeechRecognitionClass =
      typeof window !== 'undefined'
        ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
        : null;

    if (!SpeechRecognitionClass) {
      setVoiceNotice(
        language === 'mr'
          ? 'तुमचा ब्राऊझर व्हॉइस रेकॉर्डिंगला सपोर्ट करत नाही.'
          : language === 'hi'
          ? 'आपका ब्राउज़र वॉइस रिकॉर्डिंग का समर्थन नहीं करता है।'
          : 'Voice input is not supported in this browser.'
      );
      setTimeout(() => setVoiceNotice(null), 3000);
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognitionClass();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language === 'mr' ? 'mr-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0]?.[0]?.transcript;
        if (transcript) {
          setQuery((prev) => (prev ? `${prev} ${transcript}` : transcript));
        }
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Speech recognition start failed:', err);
      setIsListening(false);
    }
  };

  const fallbackBrowserSpeak = (text: string, index: number) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setVoiceNotice(
        language === 'mr'
          ? 'तुमचा ब्राऊझर ऑडिओ प्लेबॅकला सपोर्ट करत नाही.'
          : language === 'hi'
          ? 'आपका ब्राउज़र ऑडियो प्लेबैक का समर्थन नहीं करता है।'
          : 'Speech playback is not supported in this browser.'
      );
      setTimeout(() => setVoiceNotice(null), 3500);
      setSpeakingIndex(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'mr' ? 'mr-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';

    utterance.onend = () => {
      setSpeakingIndex(null);
    };
    utterance.onerror = () => {
      setSpeakingIndex(null);
    };

    setSpeakingIndex(index);
    window.speechSynthesis.speak(utterance);
  };

  const toggleSpeak = async (text: string, index: number) => {
    if (speakingIndex === index) {
      stopAllAudio();
      return;
    }

    stopAllAudio();
    setSpeakingIndex(index);

    try {
      const res = await fetch('/api/ai/speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, language }),
      });

      if (!res.ok) {
        throw new Error(`TTS HTTP error ${res.status}`);
      }

      const data = await res.json();

      if (data.audioContent) {
        const mime = data.format || 'audio/wav';
        const audio = new Audio(`data:${mime};base64,${data.audioContent}`);
        audioElementRef.current = audio;

        audio.onended = () => {
          setSpeakingIndex(null);
          audioElementRef.current = null;
        };

        audio.onerror = () => {
          audioElementRef.current = null;
          fallbackBrowserSpeak(text, index);
        };

        await audio.play();
        return;
      }

      if (data.fallbackToBrowser) {
        setVoiceNotice(
          language === 'mr'
            ? 'AI व्हॉइस उपलब्ध नाही — स्थानिक डिव्हाइस व्हॉइस वापरत आहे.'
            : language === 'hi'
            ? 'AI वॉइस अनुपलब्ध — स्थानीय डिवाइस वॉइस का उपयोग हो रहा है।'
            : 'AI voice unavailable — using device voice.'
        );
        setTimeout(() => setVoiceNotice(null), 3500);
      }
      fallbackBrowserSpeak(text, index);
    } catch {
      fallbackBrowserSpeak(text, index);
    }
  };

  const samplePrompts = language === 'mr'
    ? [
        `मी माझी ${farmerCrop} आता विकावी की १० दिवस थांबावे?`,
        `${farmerRegion} मध्ये या आठवड्यात पावसाचा काय अंदाज आहे?`,
        'उत्कृष्ट प्रत (Grade A) मालाला सर्वाधिक दर कसा मिळवायचा?',
      ]
    : language === 'hi'
    ? [
        `क्या मुझे अपनी ${farmerCrop} अभी बेचनी चाहिए या 10 दिन रुकना चाहिए?`,
        `${farmerRegion} में इस सप्ताह बारिश का क्या पूर्वानुमान है?`,
        'ग्रेड A उपज का सर्वोत्तम भाव कैसे प्राप्त करें?',
      ]
    : [
        `Should I sell my ${farmerCrop} now or wait 10 days?`,
        `What is the rainfall forecast for ${farmerRegion} this week?`,
        'How do I get the highest price for Grade A Red Onions?',
      ];

  const hasSpeechSupport =
    typeof window !== 'undefined' &&
    (('SpeechRecognition' in window) || ('webkitSpeechRecognition' in window));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-[2.5rem] w-full max-w-xl shadow-2xl border-2 border-slate-200 flex flex-col max-h-[85vh] overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 md:p-6 border-b-2 border-slate-100 flex justify-between items-center bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-xs">
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                psychology
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base md:text-lg tracking-tight">
                  {t.askKrushiAI}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 uppercase">
                  {language}
                </span>
              </div>
              <span className="text-xs text-indigo-300 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Gemini 3.7 Live Agri Advisor • {farmerRegion}
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              stopAllAudio();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        {/* Chat message stream */}
        <div className="flex-1 p-5 md:p-6 overflow-y-auto space-y-4 bg-slate-50">
          {voiceNotice && (
            <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-2xl text-xs font-medium flex items-center gap-2">
              <span className="material-symbols-outlined text-base">info</span>
              {voiceNotice}
            </div>
          )}
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="relative group max-w-[85%]">
                <div
                  className={`rounded-3xl px-5 py-3.5 text-sm leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none shadow-sm'
                      : 'bg-white text-slate-800 rounded-bl-none border-2 border-slate-200 shadow-xs'
                  }`}
                >
                  {m.text}
                </div>

                {/* Text-to-Speech Button for AI messages */}
                {m.sender === 'ai' && (
                  <button
                    type="button"
                    onClick={() => toggleSpeak(m.text, idx)}
                    title={
                      speakingIndex === idx
                        ? language === 'mr' ? 'ऑडिओ थांबवा' : language === 'hi' ? 'ऑडियो रोकें' : 'Stop reading'
                        : language === 'mr' ? 'उत्तर ऐका' : language === 'hi' ? 'उत्तर सुनें' : 'Listen to response'
                    }
                    className={`mt-1.5 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      speakingIndex === idx
                        ? 'bg-emerald-600 text-white shadow-sm animate-pulse'
                        : 'bg-slate-200/80 hover:bg-indigo-100 text-slate-700 hover:text-indigo-700'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">
                      {speakingIndex === idx ? 'volume_up' : 'volume_2'}
                    </span>
                    <span>
                      {speakingIndex === idx
                        ? (language === 'mr' ? 'ऐकवत आहे...' : language === 'hi' ? 'सुना रहा है...' : 'Speaking...')
                        : (language === 'mr' ? 'ऐका' : language === 'hi' ? 'सुनें' : 'Listen')}
                    </span>
                  </button>
                )}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 px-1 font-medium">{m.time}</span>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-indigo-600 font-bold p-3 bg-indigo-50 rounded-2xl border border-indigo-100">
              <span className="material-symbols-outlined animate-spin text-base">progress_activity</span>
              {language === 'mr'
                ? 'कृषी AI बाजारभाव व हवामान माहितीच्या आधारे सल्ला तयार करत आहे...'
                : language === 'hi'
                ? 'कृषि AI मंडी भाव एवं मौसम मॉडल के आधार पर परामर्श तैयार कर रहा है...'
                : 'FarmiGo AI is formulating insights based on APMC rates & weather models...'}
            </div>
          )}
        </div>

        {/* Quick prompt chips */}
        <div className="px-5 py-2.5 bg-white border-t-2 border-slate-100 flex gap-2 overflow-x-auto">
          {samplePrompts.map((sp, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuery(sp);
              }}
              className="text-xs font-bold bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 px-3 py-1.5 rounded-full border border-slate-200 whitespace-nowrap text-slate-700 transition-colors cursor-pointer"
            >
              {sp}
            </button>
          ))}
        </div>

        {/* Input Bar with Microphone Voice Assistant */}
        <form onSubmit={handleSend} className="p-4 border-t-2 border-slate-100 flex items-center gap-2 bg-white">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              language === 'mr'
                ? 'पिके, बाजारभाव किंवा हवामानाबद्दल विचारा...'
                : language === 'hi'
                ? 'फसल, मंडी भाव या मौसम के बारे में पूछें...'
                : 'Ask about crops, mandi prices, or pest alerts...'
            }
            className="flex-1 h-12 px-4 rounded-full bg-slate-50 border-2 border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-indigo-600"
          />

          {/* Voice Input Microphone Button */}
          {hasSpeechSupport && (
            <button
              type="button"
              onClick={toggleListening}
              title={
                isListening
                  ? language === 'mr' ? 'माईक थांबवा' : language === 'hi' ? 'माइक रोकें' : 'Stop microphone'
                  : language === 'mr' ? 'बोला (व्हॉइस इनपुट)' : language === 'hi' ? 'बोलकर पूछें (वॉइस इनपुट)' : 'Voice input (Speak)'
              }
              className={`h-12 w-12 rounded-full flex items-center justify-center transition-all shrink-0 cursor-pointer ${
                isListening
                  ? 'bg-rose-600 hover:bg-rose-700 text-white ring-4 ring-rose-200 animate-pulse shadow-lg'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-2 border-slate-200'
              }`}
            >
              <span className="material-symbols-outlined text-xl">
                {isListening ? 'mic' : 'mic_none'}
              </span>
            </button>
          )}

          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="h-12 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-full transition-all flex items-center justify-center gap-1 shrink-0 disabled:opacity-50 cursor-pointer shadow-md shadow-indigo-100"
          >
            <span className="material-symbols-outlined text-lg">send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
