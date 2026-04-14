'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';

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
  } catch (e) {
    // Ignore audio error if not supported
  }
};

export default function PresentationView({ topicId, questions, onBack }: { topicId: string, questions: string[], onBack?: () => void }) {
  const [qIndex, setQIndex] = useState(0);
  const [studentAnswer, setStudentAnswer] = useState('');
  const [checking, setChecking] = useState(false);
  const [feedback, setFeedback] = useState<'pending' | 'correct' | 'incorrect'>('pending');
  const [aiMessage, setAiMessage] = useState('');
  const [shakeKey, setShakeKey] = useState(0);

  const currentQuestion = questions[qIndex];

  const handleNav = (dir: number) => {
    let next = qIndex + dir;
    if (next < 0) next = questions.length - 1;
    if (next >= questions.length) next = 0;
    setQIndex(next);
    setStudentAnswer('');
    setFeedback('pending');
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQIndex(Number(e.target.value));
    setStudentAnswer('');
    setFeedback('pending');
  };
  
  const handleCheck = async () => {
    if (!studentAnswer.trim()) return;
    setChecking(true);
    setFeedback('pending');
    
    try {
      const res = await fetch('/api/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          topicId,
          originalSentence: currentQuestion, 
          studentAnswer 
        })
      });

      let data;
      try {
        data = await res.json();
      } catch (e) {
        data = { isCorrect: false, feedback: "Mất kết nối mạng! 🤯 Kiểm tra WiFi đi bạn ơi!" };
      }
      
      if (data.isCorrect) {
        playSound('correct');
        setFeedback('correct');
        setAiMessage(data.feedback || "Perfect! 🏆");
        
        const end = Date.now() + (3 * 1000);
        const frame = () => {
          confetti({ particleCount: 8, angle: 60, spread: 60, origin: { x: 0, y: 0.8 }, colors: ['#6a1cf6', '#4af8e3', '#ac8eff'] });
          confetti({ particleCount: 8, angle: 120, spread: 60, origin: { x: 1, y: 0.8 }, colors: ['#6a1cf6', '#4af8e3', '#ac8eff'] });
          if (Date.now() < end) requestAnimationFrame(frame);
        };
        frame();

      } else {
        playSound('incorrect');
        setFeedback('incorrect');
        setAiMessage(data.feedback || "Whoops! Try again!");
        setShakeKey(prev => prev + 1);
      }
    } catch (err) {
      setFeedback('incorrect');
      setAiMessage("Network Error! 🔌");
      setShakeKey(prev => prev + 1);
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className={`relative min-h-screen w-full flex flex-col items-center justify-center p-8 transition-colors duration-500 font-sans ${feedback === 'incorrect' ? 'bg-[#fff0f3]' : 'bg-[#fdf3ff]'}`}
      style={{
        backgroundImage: `radial-gradient(circle at 15% 50%, rgba(106, 28, 246, 0.08) 0%, transparent 50%), radial-gradient(circle at 85% 30%, rgba(172, 142, 255, 0.12) 0%, transparent 50%)`
      }}
    >
      <div className="absolute top-10 left-10 right-10 z-50 flex justify-between items-center pointer-events-none">
        
        <div className="flex items-center gap-4 pointer-events-auto">
          {onBack && (
            <button onClick={onBack} className="flex items-center gap-2 h-[4.5rem] px-6 bg-white/90 backdrop-blur-sm text-[#6a1cf6] font-bold rounded-2xl border-2 border-[#e5d5ff] hover:bg-white hover:border-[#6a1cf6] transition-all shadow-md" title="Back to Slides">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            </button>
          )}

          <div className="relative isolate font-sans">
          <select 
            className="appearance-none bg-white/90 backdrop-blur-sm border-2 border-[#e5d5ff] text-[#38274c] text-xl font-bold rounded-2xl px-6 py-4 pr-14 focus:outline-none focus:border-[#6a1cf6] focus:ring-4 focus:ring-[#6a1cf6]/20 cursor-pointer shadow-md hover:bg-white transition-all"
            value={qIndex}
            onChange={handleSelectChange}
            style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
          >
            {questions.map((q, i) => {
              const qNum = q.split('.')[0];
              return <option key={i} value={i}>Question {qNum}</option>;
            })}
          </select>
          <svg className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 text-[#6a1cf6] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        </div>
        
        <div className="flex gap-4 pointer-events-auto">
          <button onClick={() => handleNav(-1)} className="w-[4.5rem] h-[4.5rem] bg-white/90 backdrop-blur-sm hover:bg-white text-[#6a1cf6] hover:text-[#420ebd] rounded-2xl flex items-center justify-center font-bold shadow-md border-2 border-[#e5d5ff] hover:border-[#6a1cf6] transition-all transform hover:scale-[1.05] active:scale-95">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <button onClick={() => handleNav(1)} className="w-[4.5rem] h-[4.5rem] bg-white/90 backdrop-blur-sm hover:bg-white text-[#6a1cf6] hover:text-[#420ebd] rounded-2xl flex items-center justify-center font-bold shadow-md border-2 border-[#e5d5ff] hover:border-[#6a1cf6] transition-all transform hover:scale-[1.05] active:scale-95">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>
      </div>

      <div className="absolute bottom-[6vh] left-[-150px] flex items-end gap-[60px] opacity-80 pointer-events-none z-[5] animate-[run-across_12s_linear_infinite]">
        <div className="text-[5rem] drop-shadow-xl animate-[sprint-bounce_0.4s_ease-in-out_infinite_alternate]">🤖</div>
        <div className="text-[5rem] drop-shadow-xl animate-[sprint-bounce_0.3s_ease-in-out_infinite_alternate]">🐕</div>
      </div>

      <div className="absolute top-[8vh] right-[-150px] flex items-end gap-[60px] opacity-80 pointer-events-none z-[5] animate-[run-across-reverse_14s_linear_infinite]">
        <div className="text-[5rem] drop-shadow-xl animate-[sprint-bounce_0.35s_ease-in-out_infinite_alternate]">👽</div>
        <div className="text-[5rem] drop-shadow-xl animate-[sprint-bounce_0.25s_ease-in-out_infinite_alternate]">🐱</div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes run-across { 0% { left: -150px; transform: scaleX(-1); } 48% { left: 110vw; transform: scaleX(-1); } 50% { left: 110vw; transform: scaleX(1); } 98% { left: -150px; transform: scaleX(1); } 100% { left: -150px; transform: scaleX(-1); } }
        @keyframes run-across-reverse { 0% { right: -150px; transform: scaleX(1); } 48% { right: 110vw; transform: scaleX(1); } 50% { right: 110vw; transform: scaleX(-1); } 98% { right: -150px; transform: scaleX(-1); } 100% { right: -150px; transform: scaleX(1); } }
        @keyframes sprint-bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        @keyframes shake-error { 0%, 100% { transform: translate(-1/2, 0); } 10%, 30%, 50%, 70%, 90% { transform: translate(calc(-50% - 15px), 0); } 20%, 40%, 60%, 80% { transform: translate(calc(-50% + 15px), 0); } }
        @keyframes pop-in { 0% { opacity: 0; transform: translate(-50%, 60px) scale(0.5); } 50% { opacity: 1; transform: translate(-50%, -20px) scale(1.1); } 70% { transform: translate(-50%, 10px) scale(0.95); } 100% { opacity: 1; transform: translate(-50%, 0) scale(1); } }
        @keyframes modal-pop-in { 0% { opacity: 0; transform: scale(0.5); } 50% { opacity: 1; transform: scale(1.05); } 70% { transform: scale(0.95); } 100% { opacity: 1; transform: scale(1); } }
        @keyframes modal-shake { 0%, 100% { transform: translateX(0); } 10%, 30%, 50%, 70%, 90% { transform: translateX(-20px); } 20%, 40%, 60%, 80% { transform: translateX(20px); } }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes shockwave { 0% { transform: scale(0.5); opacity: 0.8; } 100% { transform: scale(2.5); border-width: 0px; opacity: 0; } }
      `}} />

      <main key={qIndex} className="z-10 w-full flex flex-col items-center space-y-20 mt-10">
        <div className="text-center w-[95%] max-w-[1500px] animate-[fade-in-down_0.8s_forwards]">
          <h1 className="text-[#38274c] text-[4.2rem] font-bold leading-[1.2]" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>{currentQuestion.substring(currentQuestion.indexOf('.') + 1).trim()}</h1>
        </div>

        <div className="w-[95vw] max-w-[1500px] relative animate-[fade-in-up_0.8s_forwards]" style={{ animationDelay: '100ms' }}>
          <div className={`absolute -inset-2 rounded-[4rem] blur-lg opacity-30 transition-all duration-700 ${feedback === 'correct' ? 'bg-[#4af8e3]' : feedback === 'incorrect' ? 'bg-[#f74b6d] animate-pulse' : 'bg-gradient-to-r from-[#6a1cf6] to-[#4af8e3]'}`}></div>
          <input
            type="text"
            value={studentAnswer}
            onChange={(e) => setStudentAnswer(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
            placeholder="Type your answer here..."
            className={`relative w-full text-center text-4xl md:text-[3.5rem] leading-tight py-14 px-12 bg-white/90 backdrop-blur-xl text-[#2d1b3f] placeholder-[#aa94c1]/60 rounded-[4rem] transition-all duration-300 outline-none shadow-[0_20px_50px_-20px_rgba(106,28,246,0.3)] ${feedback === 'correct' ? 'ring-4 ring-[#4af8e3]' : feedback === 'incorrect' ? 'ring-8 ring-[#f74b6d]/50 text-[#b41340]' : 'ring-2 ring-white focus:ring-4 focus:ring-[#ac8eff]/60'}`}
            readOnly={checking}
          />
        </div>

        <div className="animate-[fade-in-up_0.8s_forwards]" style={{ animationDelay: '200ms' }}>
          <button
            onClick={handleCheck}
            disabled={checking || !studentAnswer.trim()}
            className={`relative px-24 py-8 rounded-[3rem] text-4xl font-bold text-white transition-all ${(checking || !studentAnswer.trim()) ? 'opacity-50 cursor-not-allowed filter grayscale-[20%]' : 'cursor-pointer hover:scale-[1.05]'}`}
            style={{ 
              background: 'linear-gradient(135deg, #6a1cf6 0%, #ac8eff 100%)',
              fontFamily: '"Space Grotesk", sans-serif',
              boxShadow: '0 10px 30px -10px rgba(106, 28, 246, 0.6), inset 0px -4px 10px rgba(0,0,0,0.15), inset 0px 4px 10px rgba(255,255,255,0.3)'
            }}
          >
            {checking ? (
              <span className="flex items-center gap-5">
                <svg className="animate-spin h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
                AI THINKING...
              </span>
            ) : 'AI CHECK'}
          </button>
        </div>
      </main>

      {feedback !== 'pending' && !checking && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md animate-[fade-in_0.3s_forwards]">
          <div 
            key={feedback === 'incorrect' ? shakeKey : 'correct'}
            className={`relative flex flex-col items-center gap-12 px-24 py-20 rounded-[5rem] w-[90vw] max-w-[1400px] text-center ${
              feedback === 'correct' 
              ? 'bg-[#E0FCF8]/95 border-[8px] border-[#4af8e3] shadow-[0_40px_150px_rgba(74,248,227,0.6)]' 
              : 'bg-[#FFF0F3]/95 border-[8px] border-[#f74b6d] shadow-[0_40px_150px_rgba(247,75,109,0.6)]'
            }`}
            style={{ animation: feedback === 'correct' ? 'modal-pop-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' : 'modal-shake 0.5s cubic-bezier(.36,.07,.19,.97) forwards' }}
          >
            <button 
              onClick={() => setFeedback('pending')}
              className="absolute top-10 right-10 w-20 h-20 flex items-center justify-center bg-white rounded-full text-5xl text-gray-500 hover:text-red-500 hover:bg-gray-100 transition-all shadow-xl hover:scale-110 active:scale-95"
            >
              ✕
            </button>
            
            <div className={`absolute inset-0 rounded-[5rem] border-8 pointer-events-none ${feedback === 'correct' ? 'border-[#4af8e3]' : 'border-[#f74b6d]'}`} style={{ animation: 'shockwave 1s cubic-bezier(0.16, 1, 0.3, 1) forwards' }} />
            
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
          </div>
        </div>
      )}
    </div>
  );
}
