'use client';

import { useState } from "react";
import confetti from 'canvas-confetti';
import type { WordFormQuestion } from "../../data/grade6Data";

const playSound = (type: 'correct' | 'incorrect') => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    if (type === 'correct') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.5);
    } else {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);
    }
  } catch (e) { /* ignore */ }
};

const CSS_ANIMATIONS = `
  @keyframes run-across {
    0%   { left: -150px; transform: scaleX(-1); }
    48%  { left: 110vw;  transform: scaleX(-1); }
    50%  { left: 110vw;  transform: scaleX(1);  }
    98%  { left: -150px; transform: scaleX(1);  }
    100% { left: -150px; transform: scaleX(-1); }
  }
  @keyframes run-across-reverse {
    0%   { right: -150px; transform: scaleX(1);  }
    48%  { right: 110vw;  transform: scaleX(1);  }
    50%  { right: 110vw;  transform: scaleX(-1); }
    98%  { right: -150px; transform: scaleX(-1); }
    100% { right: -150px; transform: scaleX(1);  }
  }
  @keyframes sprint-bounce {
    0%, 100% { transform: translateY(0);    }
    50%       { transform: translateY(-20px); }
  }
  @keyframes modal-pop-in {
    0%   { opacity: 0; transform: scale(0.5);  }
    50%  { opacity: 1; transform: scale(1.05); }
    70%  {             transform: scale(0.95); }
    100% { opacity: 1; transform: scale(1);    }
  }
  @keyframes modal-shake {
    0%, 100%                    { transform: translateX(0);    }
    10%, 30%, 50%, 70%, 90%    { transform: translateX(-20px); }
    20%, 40%, 60%, 80%         { transform: translateX(20px);  }
  }
  @keyframes g6-fade-in { from { opacity: 0; } to { opacity: 1; } }
  @keyframes shockwave {
    0%   { transform: scale(0.5); opacity: 0.8; }
    100% { transform: scale(2.5); border-width: 0px; opacity: 0; }
  }
`;

export default function WordFormMode({
  data,
  onExit,
}: {
  data: WordFormQuestion[];
  onExit: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<'pending' | 'correct' | 'incorrect'>('pending');
  const [aiMessage, setAiMessage] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);

  const currentQ = data[currentIndex];

  const handleCheck = async () => {
    if (!answer.trim() || isEvaluating) return;
    setIsEvaluating(true);
    setFeedback('pending');

    try {
      const topicId = currentQ.type === 'rewriting' ? 'grade6-rewriting' : 'grade6-word-form';
      const res = await fetch('/api/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topicId, originalSentence: currentQ.prompt, studentAnswer: answer }),
      });
      let resData: any;
      try { resData = await res.json(); }
      catch { resData = { isCorrect: false, feedback: "Mất kết nối! 🤯 Check WiFi nha!" }; }

      if (resData.isCorrect) {
        playSound('correct');
        setFeedback('correct');
        setAiMessage(resData.feedback || "Quá đỉnh! 🏆");
        const end = Date.now() + 3000;
        const frame = () => {
          confetti({ particleCount: 8, angle: 60, spread: 60, origin: { x: 0, y: 0.8 }, colors: ['#6a1cf6', '#4af8e3', '#ac8eff'] });
          confetti({ particleCount: 8, angle: 120, spread: 60, origin: { x: 1, y: 0.8 }, colors: ['#6a1cf6', '#4af8e3', '#ac8eff'] });
          if (Date.now() < end) requestAnimationFrame(frame);
        };
        frame();
      } else {
        playSound('incorrect');
        setFeedback('incorrect');
        setAiMessage(resData.feedback || "Whoops! Thử lại nha!");
        setShakeKey(prev => prev + 1);
      }
    } catch {
      setFeedback('incorrect');
      setAiMessage("Network Error! 🔌");
    } finally {
      setIsEvaluating(false);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setAnswer("");
      setFeedback('pending');
    } else {
      onExit();
    }
  };

  const bgClass = feedback === 'incorrect' ? 'bg-[#fff0f3]' : 'bg-[#fdf3ff]';

  const inputRingClass = feedback === 'correct'
    ? 'ring-4 ring-[#4af8e3]'
    : feedback === 'incorrect'
      ? 'ring-8 ring-[#f74b6d]/50 text-[#b41340]'
      : 'ring-2 ring-white focus:ring-4 focus:ring-[#ac8eff]/60';

  const glowClass = feedback === 'correct'
    ? 'bg-[#4af8e3]'
    : feedback === 'incorrect'
      ? 'bg-[#f74b6d] animate-pulse'
      : 'bg-gradient-to-r from-[#6a1cf6] to-[#4af8e3]';

  const modalClass = feedback === 'correct'
    ? 'bg-[#E0FCF8]/95 border-[8px] border-[#4af8e3] shadow-[0_40px_150px_rgba(74,248,227,0.6)]'
    : 'bg-[#FFF0F3]/95 border-[8px] border-[#f74b6d] shadow-[0_40px_150px_rgba(247,75,109,0.6)]';

  const modalAnimation = feedback === 'correct'
    ? 'modal-pop-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
    : 'modal-shake 0.5s cubic-bezier(.36,.07,.19,.97) forwards';

  const btnDisabled = isEvaluating || !answer.trim();

  return (
    <div
      className={`fixed inset-0 z-50 w-full min-h-screen flex flex-col items-center justify-center p-8 transition-colors duration-500 font-sans ${bgClass}`}
      style={{ backgroundImage: 'radial-gradient(circle at 15% 50%, rgba(106, 28, 246, 0.08) 0%, transparent 50%), radial-gradient(circle at 85% 30%, rgba(172, 142, 255, 0.12) 0%, transparent 50%)' }}
    >
      <style dangerouslySetInnerHTML={{ __html: CSS_ANIMATIONS }} />

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
        <span className="bg-white/80 backdrop-blur-sm text-[#6a1cf6] border-2 border-[#e5d5ff] font-bold rounded-2xl px-6 py-3 shadow-md">
          {currentIndex + 1} / {data.length}
        </span>
      </div>

      {/* Robot + Dog running */}
      <div className="absolute bottom-[6vh] left-[-150px] flex items-end gap-[60px] opacity-80 pointer-events-none z-[5]" style={{ animation: 'run-across 12s linear infinite' }}>
        <div className="text-[5rem] drop-shadow-xl" style={{ animation: 'sprint-bounce 0.4s ease-in-out infinite alternate' }}>🤖</div>
        <div className="text-[5rem] drop-shadow-xl" style={{ animation: 'sprint-bounce 0.3s ease-in-out infinite alternate' }}>🐕</div>
      </div>

      {/* Alien + Cat running */}
      <div className="absolute top-[8vh] right-[-150px] flex items-end gap-[60px] opacity-80 pointer-events-none z-[5]" style={{ animation: 'run-across-reverse 14s linear infinite' }}>
        <div className="text-[5rem] drop-shadow-xl" style={{ animation: 'sprint-bounce 0.35s ease-in-out infinite alternate' }}>👽</div>
        <div className="text-[5rem] drop-shadow-xl" style={{ animation: 'sprint-bounce 0.25s ease-in-out infinite alternate' }}>🐱</div>
      </div>

      {/* Main content */}
      <main key={currentIndex} className="z-10 w-full flex flex-col items-center space-y-16 mt-0">
        <div className="text-center w-[95%] max-w-[1500px]" style={{ animation: 'g6-fade-in 0.8s forwards' }}>
          {currentQ.baseWord && (
            <div className="mb-4 text-3xl font-bold text-[#6a1cf6]">
              Từ gốc:{' '}
              <span className="uppercase tracking-widest bg-white/70 px-6 py-2 rounded-xl ml-3 inline-block shadow-sm border border-[#e5d5ff]">
                {currentQ.baseWord}
              </span>
            </div>
          )}
          <h1
            className="text-[#38274c] text-[4rem] font-bold leading-[1.3]"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}
          >
            {currentQ.prompt.split('_____').map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span className="inline-block border-b-[6px] border-dashed border-[#6a1cf6]/60 w-32 md:w-48 mx-3 align-text-bottom" />
                )}
              </span>
            ))}
          </h1>
        </div>

        {/* Input */}
        <div className="w-[95vw] max-w-[1500px] relative" style={{ animation: 'g6-fade-in 0.8s forwards', animationDelay: '100ms' }}>
          <div className={`absolute -inset-2 rounded-[4rem] blur-lg opacity-30 transition-all duration-700 ${glowClass}`} />
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
            placeholder="Gõ đáp án vào đây nào..."
            readOnly={isEvaluating}
            className={`relative w-full text-center text-4xl leading-tight py-14 px-12 bg-white/90 backdrop-blur-xl text-[#2d1b3f] placeholder-[#aa94c1]/60 rounded-[4rem] transition-all duration-300 outline-none shadow-[0_20px_50px_-20px_rgba(106,28,246,0.3)] ${inputRingClass}`}
          />
        </div>

        {/* Button */}
        <div style={{ animation: 'g6-fade-in 0.8s forwards', animationDelay: '200ms' }}>
          <button
            onClick={handleCheck}
            disabled={btnDisabled}
            className={`relative px-24 py-8 rounded-[3rem] text-4xl font-bold text-white transition-all ${btnDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-[1.05]'}`}
            style={{
              background: 'linear-gradient(135deg, #6a1cf6 0%, #ac8eff 100%)',
              fontFamily: '"Space Grotesk", sans-serif',
              boxShadow: '0 10px 30px -10px rgba(106, 28, 246, 0.6), inset 0px -4px 10px rgba(0,0,0,0.15), inset 0px 4px 10px rgba(255,255,255,0.3)',
            }}
          >
            {isEvaluating ? (
              <span className="flex items-center gap-5">
                <svg className="animate-spin h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                AI ĐANG CHẤM...
              </span>
            ) : (
              'AI CHẤM ĐIỂM ✨'
            )}
          </button>
        </div>
      </main>

      {/* AI Popup modal */}
      {feedback !== 'pending' && !isEvaluating && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md" style={{ animation: 'g6-fade-in 0.3s forwards' }}>
          <div
            key={feedback === 'incorrect' ? shakeKey : 'correct'}
            className={`relative flex flex-col items-center gap-12 px-24 py-20 rounded-[5rem] w-[90vw] max-w-[1400px] text-center ${modalClass}`}
            style={{ animation: modalAnimation }}
          >
            {/* X button */}
            <button
              onClick={() => feedback === 'correct' ? nextQuestion() : setFeedback('pending')}
              className="absolute top-10 right-10 w-20 h-20 flex items-center justify-center bg-white rounded-full text-5xl text-gray-500 hover:text-red-500 hover:bg-gray-100 transition-all shadow-xl hover:scale-110 active:scale-95"
            >
              ✕
            </button>

            {/* Shockwave ring */}
            <div
              className={`absolute inset-0 rounded-[5rem] border-8 pointer-events-none ${feedback === 'correct' ? 'border-[#4af8e3]' : 'border-[#f74b6d]'}`}
              style={{ animation: 'shockwave 1s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
            />

            {feedback === 'correct' ? (
              <>
                <div className="text-[160px] leading-none animate-bounce drop-shadow-2xl">🥳</div>
                <div className="flex flex-col gap-6 items-center">
                  <h3 className="text-7xl font-bold text-[#00463f] tracking-wide" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>JACKPOT!</h3>
                  <p className="text-[3.5rem] leading-[1.3] text-[#00655b] max-w-4xl font-medium">{aiMessage}</p>
                </div>
              </>
            ) : (
              <>
                <div className="text-[160px] leading-none animate-pulse drop-shadow-2xl">😱</div>
                <div className="flex flex-col gap-6 items-center">
                  <h3 className="text-7xl font-bold text-[#510017] tracking-wide" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Whoops!</h3>
                  <p className="text-[3.5rem] leading-[1.3] text-[#a70138] max-w-4xl font-medium">{aiMessage}</p>
                </div>
              </>
            )}

            <button
              onClick={() => feedback === 'correct' ? nextQuestion() : setFeedback('pending')}
              className="mt-4 px-16 py-6 bg-white rounded-full text-3xl font-bold text-gray-700 hover:bg-gray-100 transition-colors shadow-lg border-2 border-gray-200"
            >
              {feedback === 'correct'
                ? (currentIndex < data.length - 1 ? 'Câu tiếp theo ➜' : '🎉 Quay về Menu')
                : 'Viết lại nhé ↺'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
