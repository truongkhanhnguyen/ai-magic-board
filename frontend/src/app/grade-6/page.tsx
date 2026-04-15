"use client";

import { useState } from "react";
import Link from "next/link";
import confetti from 'canvas-confetti';
import { ArrowLeft, Volume2, BookOpen, Type, PenLine } from "lucide-react";
import { grade6MCPronunciation, grade6MCGrammar, grade6WordForms, grade6Rewriting } from "../../data/grade6Data";
import type { MultipleChoiceQuestion, WordFormQuestion } from "../../data/grade6Data";
import Grade6GrammarSlides, { grade6Slides } from "../../components/grade-6/Grade6GrammarSlides";
import WordFormMode from "../../components/grade-6/WordFormMode";

const MC_CSS = `
  @keyframes mc-run-across { 0% { left: -150px; transform: scaleX(-1); } 48% { left: 110vw; transform: scaleX(-1); } 50% { left: 110vw; transform: scaleX(1); } 98% { left: -150px; transform: scaleX(1); } 100% { left: -150px; transform: scaleX(-1); } }
  @keyframes mc-run-reverse { 0% { right: -150px; transform: scaleX(1); } 48% { right: 110vw; transform: scaleX(1); } 50% { right: 110vw; transform: scaleX(-1); } 98% { right: -150px; transform: scaleX(-1); } 100% { right: -150px; transform: scaleX(1); } }
  @keyframes mc-bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
  @keyframes mc-pop-in { 0% { opacity: 0; transform: scale(0.5); } 50% { opacity: 1; transform: scale(1.05); } 70% { transform: scale(0.95); } 100% { opacity: 1; transform: scale(1); } }
  @keyframes mc-shake { 0%, 100% { transform: translateX(0); } 10%, 30%, 50%, 70%, 90% { transform: translateX(-20px); } 20%, 40%, 60%, 80% { transform: translateX(20px); } }
  @keyframes mc-fade { from { opacity: 0; } to { opacity: 1; } }
  @keyframes mc-shockwave { 0% { transform: scale(0.5); opacity: 0.8; } 100% { transform: scale(2.5); border-width: 0px; opacity: 0; } }
`;

const playMCSound = (type: 'correct' | 'incorrect') => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    if (type === 'correct') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.5);
    } else {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.3);
    }
  } catch { /* ignore */ }
};

type SectionId = "pronunciation" | "grammar" | "word-form" | "rewriting";
type Mode = "theory" | "menu" | SectionId;

interface Section {
  id: SectionId;
  title: string;
  subtitle: string;
  count: number;
  icon: React.ReactNode;
  accent: string;
  bgGlow: string;
  border: string;
  badge: string;
}

const SECTIONS: Section[] = [
  {
    id: "pronunciation",
    title: "Phát âm & Trọng âm",
    subtitle: "Tìm từ khác biệt về âm hoặc trọng âm",
    count: grade6MCPronunciation.length,
    icon: <Volume2 className="w-8 h-8" />,
    accent: "text-sky-400",
    bgGlow: "bg-sky-500/10",
    border: "border-sky-500/30 hover:border-sky-400/70",
    badge: "bg-sky-500/20 text-sky-300",
  },
  {
    id: "grammar",
    title: "Từ vựng & Ngữ pháp",
    subtitle: "Điền từ vào chỗ trống các câu thực tế",
    count: grade6MCGrammar.length,
    icon: <BookOpen className="w-8 h-8" />,
    accent: "text-emerald-400",
    bgGlow: "bg-emerald-500/10",
    border: "border-emerald-500/30 hover:border-emerald-400/70",
    badge: "bg-emerald-500/20 text-emerald-300",
  },
  {
    id: "word-form",
    title: "Biến đổi từ",
    subtitle: "Cho từ gốc, biến thành dạng phù hợp",
    count: grade6WordForms.length,
    icon: <Type className="w-8 h-8" />,
    accent: "text-amber-400",
    bgGlow: "bg-amber-500/10",
    border: "border-amber-500/30 hover:border-amber-400/70",
    badge: "bg-amber-500/20 text-amber-300",
  },
  {
    id: "rewriting",
    title: "Viết lại câu",
    subtitle: "Viết lại câu mà không thay đổi nghĩa",
    count: grade6Rewriting.length,
    icon: <PenLine className="w-8 h-8" />,
    accent: "text-violet-400",
    bgGlow: "bg-violet-500/10",
    border: "border-violet-500/30 hover:border-violet-400/70",
    badge: "bg-violet-500/20 text-violet-300",
  },
];

// --- Multiple Choice Engine (Full-screen bright mode) ---
function MultipleChoiceEngine({
  data,
  onExit,
}: {
  data: MultipleChoiceQuestion[];
  onExit: () => void;
  accentColor?: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'pending' | 'correct' | 'incorrect'>('pending');
  const [feedbackText, setFeedbackText] = useState('');
  const [shakeKey, setShakeKey] = useState(0);

  const current = data[currentIndex];

  const handleSelect = (key: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(key);
    const isCorrect = key === current.correctAnswer;
    if (isCorrect) {
      playMCSound('correct');
      setFeedback('correct');
      setFeedbackText(`Đỉnh chóp luôn bé ơi! 🎯 ${current.explanation}`);
      const end = Date.now() + 3000;
      const frame = () => {
        confetti({ particleCount: 8, angle: 60, spread: 60, origin: { x: 0, y: 0.8 }, colors: ['#6a1cf6', '#4af8e3', '#ac8eff'] });
        confetti({ particleCount: 8, angle: 120, spread: 60, origin: { x: 1, y: 0.8 }, colors: ['#6a1cf6', '#4af8e3', '#ac8eff'] });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    } else {
      playMCSound('incorrect');
      setFeedback('incorrect');
      setFeedbackText(`Hơi trật xíu rồi! 💦 Đáp án đúng là ${current.correctAnswer}. ${current.explanation}`);
      setShakeKey(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(p => p + 1);
      setSelectedAnswer(null);
      setFeedback('pending');
      setFeedbackText('');
    } else {
      onExit();
    }
  };

  const handleNav = (dir: number) => {
    const next = Math.max(0, Math.min(data.length - 1, currentIndex + dir));
    setCurrentIndex(next);
    setSelectedAnswer(null);
    setFeedback('pending');
    setFeedbackText('');
  };

  const bgClass = feedback === 'incorrect' ? 'bg-[#fff0f3]' : 'bg-[#fdf3ff]';
  const modalClass = feedback === 'correct'
    ? 'bg-[#E0FCF8]/95 border-[8px] border-[#4af8e3] shadow-[0_40px_150px_rgba(74,248,227,0.6)]'
    : 'bg-[#FFF0F3]/95 border-[8px] border-[#f74b6d] shadow-[0_40px_150px_rgba(247,75,109,0.6)]';
  const modalAnim = feedback === 'correct'
    ? 'mc-pop-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
    : 'mc-shake 0.5s cubic-bezier(.36,.07,.19,.97) forwards';

  return (
    <div
      className={`fixed inset-0 z-50 w-full min-h-screen flex flex-col items-center justify-center p-8 font-sans transition-colors duration-500 ${bgClass}`}
      style={{ backgroundImage: 'radial-gradient(circle at 15% 50%, rgba(106, 28, 246, 0.08) 0%, transparent 50%), radial-gradient(circle at 85% 30%, rgba(172, 142, 255, 0.12) 0%, transparent 50%)' }}
    >
      <style dangerouslySetInnerHTML={{ __html: MC_CSS }} />

      {/* Top bar */}
      <div className="absolute top-10 left-10 right-10 z-[60] flex items-center justify-between pointer-events-none">
        <button
          onClick={onExit}
          className="pointer-events-auto flex items-center gap-2 h-[4.5rem] px-6 bg-white/90 backdrop-blur-sm text-[#6a1cf6] font-bold rounded-2xl border-2 border-[#e5d5ff] hover:bg-white hover:border-[#6a1cf6] transition-all shadow-md"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Menu
        </button>

        <div className="flex items-center gap-4 pointer-events-auto">
          <button
            onClick={() => handleNav(-1)}
            disabled={currentIndex === 0}
            className="w-[4.5rem] h-[4.5rem] bg-white/90 backdrop-blur-sm hover:bg-white text-[#6a1cf6] rounded-2xl flex items-center justify-center font-bold shadow-md border-2 border-[#e5d5ff] hover:border-[#6a1cf6] transition-all hover:scale-[1.05] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <span className="bg-white/80 backdrop-blur-sm text-[#6a1cf6] border-2 border-[#e5d5ff] font-bold rounded-2xl px-6 py-3 shadow-md">
            {currentIndex + 1} / {data.length}
          </span>
          <button
            onClick={() => handleNav(1)}
            disabled={currentIndex === data.length - 1}
            className="w-[4.5rem] h-[4.5rem] bg-white/90 backdrop-blur-sm hover:bg-white text-[#6a1cf6] rounded-2xl flex items-center justify-center font-bold shadow-md border-2 border-[#e5d5ff] hover:border-[#6a1cf6] transition-all hover:scale-[1.05] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>

      {/* Running 🤖🐕 */}
      <div className="absolute bottom-[6vh] left-[-150px] flex items-end gap-[60px] opacity-80 pointer-events-none z-[5]" style={{ animation: 'mc-run-across 12s linear infinite' }}>
        <div className="text-[5rem] drop-shadow-xl" style={{ animation: 'mc-bounce 0.4s ease-in-out infinite alternate' }}>🤖</div>
        <div className="text-[5rem] drop-shadow-xl" style={{ animation: 'mc-bounce 0.3s ease-in-out infinite alternate' }}>🐕</div>
      </div>
      {/* Running 👽🐱 */}
      <div className="absolute top-[8vh] right-[-150px] flex items-end gap-[60px] opacity-80 pointer-events-none z-[5]" style={{ animation: 'mc-run-reverse 14s linear infinite' }}>
        <div className="text-[5rem] drop-shadow-xl" style={{ animation: 'mc-bounce 0.35s ease-in-out infinite alternate' }}>👽</div>
        <div className="text-[5rem] drop-shadow-xl" style={{ animation: 'mc-bounce 0.25s ease-in-out infinite alternate' }}>🐱</div>
      </div>

      {/* Question */}
      <main key={currentIndex} className="z-10 w-full flex flex-col items-center gap-12 mt-0" style={{ animation: 'mc-fade 0.6s forwards' }}>
        <div className="text-center w-[95%] max-w-[1400px]">
          <h1 className="text-[#38274c] text-[3.4rem] font-bold leading-[1.3]" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            {current.question}
          </h1>
        </div>

        {/* Options grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-[95%] max-w-[1400px]">
          {Object.entries(current.options).map(([key, value]) => {
            const isSelected = selectedAnswer === key;
            const isCorrectKey = key === current.correctAnswer;
            let borderColor = '#e5d5ff';
            let bgColor = 'rgba(255,255,255,0.85)';
            let textColor = '#2d1b3f';
            if (selectedAnswer) {
              if (isCorrectKey) { borderColor = '#4af8e3'; bgColor = 'rgba(224,252,248,0.95)'; textColor = '#00463f'; }
              else if (isSelected) { borderColor = '#f74b6d'; bgColor = 'rgba(255,240,243,0.95)'; textColor = '#510017'; }
            }
            return (
              <button
                key={key}
                disabled={!!selectedAnswer}
                onClick={() => handleSelect(key)}
                className="relative flex items-center gap-5 p-7 rounded-[2rem] border-[3px] text-left transition-all duration-300 text-2xl font-semibold min-h-[80px] bg-white/85 backdrop-blur-sm hover:scale-[1.02] hover:shadow-xl disabled:cursor-default"
                style={{ borderColor, backgroundColor: bgColor, color: textColor, boxShadow: '0 8px 30px -8px rgba(106,28,246,0.15)' }}
              >
                <span className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shrink-0 border-2" style={{ borderColor, color: textColor }}>
                  {key}
                </span>
                <span className="leading-snug flex-grow">{value}</span>
                {selectedAnswer && isCorrectKey && <span className="text-3xl shrink-0">✅</span>}
                {selectedAnswer && isSelected && !isCorrectKey && <span className="text-3xl shrink-0">❌</span>}
              </button>
            );
          })}
        </div>
      </main>

      {/* Big popup modal */}
      {feedback !== 'pending' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md" style={{ animation: 'mc-fade 0.3s forwards' }}>
          <div
            key={feedback === 'incorrect' ? shakeKey : 'correct'}
            className={`relative flex flex-col items-center gap-12 px-24 py-20 rounded-[5rem] w-[90vw] max-w-[1400px] text-center ${modalClass}`}
            style={{ animation: modalAnim }}
          >
            <button
              onClick={() => feedback === 'correct' ? handleNext() : setFeedback('pending')}
              className="absolute top-10 right-10 w-20 h-20 flex items-center justify-center bg-white rounded-full text-5xl text-gray-500 hover:text-red-500 hover:bg-gray-100 transition-all shadow-xl hover:scale-110 active:scale-95"
            >
              ✕
            </button>
            <div
              className={`absolute inset-0 rounded-[5rem] border-8 pointer-events-none ${feedback === 'correct' ? 'border-[#4af8e3]' : 'border-[#f74b6d]'}`}
              style={{ animation: 'mc-shockwave 1s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
            />
            {feedback === 'correct' ? (
              <>
                <div className="text-[160px] leading-none animate-bounce drop-shadow-2xl">🥳</div>
                <div className="flex flex-col gap-6 items-center">
                  <h3 className="text-7xl font-bold text-[#00463f] tracking-wide" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>JACKPOT!</h3>
                  <p className="text-[3rem] leading-[1.3] text-[#00655b] max-w-4xl font-medium">{feedbackText}</p>
                </div>
              </>
            ) : (
              <>
                <div className="text-[160px] leading-none animate-pulse drop-shadow-2xl">😱</div>
                <div className="flex flex-col gap-6 items-center">
                  <h3 className="text-7xl font-bold text-[#510017] tracking-wide" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Whoops!</h3>
                  <p className="text-[3rem] leading-[1.3] text-[#a70138] max-w-4xl font-medium">{feedbackText}</p>
                </div>
              </>
            )}
            <button
              onClick={() => feedback === 'correct' ? handleNext() : setFeedback('pending')}
              className="mt-4 px-16 py-6 bg-white rounded-full text-3xl font-bold text-gray-700 hover:bg-gray-100 transition-colors shadow-lg border-2 border-gray-200"
            >
              {feedback === 'correct'
                ? (currentIndex < data.length - 1 ? 'Câu tiếp theo ➜' : '🎉 Hoàn thành!')
                : 'Thử lại xem nào ↺'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Main Page ---
export default function Grade6Page() {
  const [mode, setMode] = useState<Mode>("theory");
  const [slideIdx, setSlideIdx] = useState(0);

  const exitToMenu = () => setMode("menu");

  const activeSection = SECTIONS.find((s) => s.id === mode);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 md:p-8 relative overflow-hidden flex flex-col">
      {/* Background glow */}
      <div className="absolute top-[-15%] right-[-10%] w-[45%] h-[45%] bg-emerald-600/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-15%] left-[-10%] w-[45%] h-[45%] bg-teal-600/8 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 w-full mb-8 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium group transition-colors bg-slate-800/60 px-4 py-2 rounded-full border border-emerald-500/20 backdrop-blur-sm min-h-[44px]"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Portal
        </Link>
        <h1 className="text-xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
          Grade 6 Arena
        </h1>
        {mode !== "theory" && mode !== "menu" && (
          <span className="text-slate-500 text-sm">
            {activeSection?.count} câu
          </span>
        )}
        {(mode === "theory" || mode === "menu") && <div className="w-20" />}
      </header>

      {/* Theory Mode */}
      {mode === "theory" && (
        <Grade6GrammarSlides
          currentSlide={slideIdx}
          isFirst={slideIdx === 0}
          isLast={slideIdx === grade6Slides.length - 1}
          onNext={() => setSlideIdx((p) => p + 1)}
          onPrev={() => setSlideIdx((p) => p - 1)}
          onStartGame={() => setMode("menu")}
        />
      )}

      {/* 4-Section Menu */}
      {mode === "menu" && (
        <div className="relative z-10 flex-grow flex flex-col items-center justify-center max-w-5xl mx-auto w-full">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-3">Chọn phần luyện tập</h2>
            <p className="text-slate-400 text-lg">4 phần theo cấu trúc đề kiểm tra</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
            {SECTIONS.map((section, i) => (
              <button
                key={section.id}
                onClick={() => setMode(section.id)}
                className={`group relative flex items-start gap-5 p-7 rounded-3xl bg-slate-800/70 border-2 ${section.border} backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl text-left min-h-[120px]`}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {/* Glow on hover */}
                <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${section.bgGlow}`} />

                {/* Icon */}
                <div className={`relative shrink-0 w-14 h-14 rounded-2xl ${section.bgGlow} border border-white/10 flex items-center justify-center ${section.accent}`}>
                  {section.icon}
                </div>

                {/* Text */}
                <div className="relative flex-grow">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`text-xl font-bold text-white group-hover:${section.accent} transition-colors`}>
                      {section.title}
                    </h3>
                    <span className={`text-sm font-bold px-3 py-1 rounded-full ${section.badge}`}>
                      {section.count} câu
                    </span>
                  </div>
                  <p className="text-slate-400 text-base leading-relaxed">{section.subtitle}</p>
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={() => setMode("theory")}
            className="mt-8 text-slate-500 hover:text-slate-300 transition-colors text-sm inline-flex items-center gap-2 min-h-[44px] px-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Xem lại lý thuyết
          </button>
        </div>
      )}

      {/* Pronunciation Section */}
      {mode === "pronunciation" && (
        <MultipleChoiceEngine
          data={grade6MCPronunciation}
          onExit={exitToMenu}
          accentColor="bg-sky-500"
        />
      )}

      {/* Grammar Section */}
      {mode === "grammar" && (
        <MultipleChoiceEngine
          data={grade6MCGrammar}
          onExit={exitToMenu}
          accentColor="bg-emerald-500"
        />
      )}

      {/* Word Form Section */}
      {mode === "word-form" && (
        <WordFormMode data={grade6WordForms} onExit={exitToMenu} />
      )}

      {/* Rewriting Section */}
      {mode === "rewriting" && (
        <WordFormMode data={grade6Rewriting} onExit={exitToMenu} />
      )}
    </div>
  );
}
