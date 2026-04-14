'use client';

import React, { useState, useEffect } from 'react';

export default function GrammarSlides({ slides, onComplete }: { slides: any[], onComplete: () => void }) {
  const [slide, setSlide] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [animating, setAnimating] = useState(false);

  // Reset slide to 0 when module changes
  useEffect(() => {
    setSlide(0);
  }, [slides]);

  const goNext = () => {
    if (slide === slides.length - 1) return;
    setDirection('next');
    setAnimating(true);
    setTimeout(() => {
      setSlide(s => s + 1);
      setAnimating(false);
    }, 400);
  };

  const goPrev = () => {
    if (slide === 0) return;
    setDirection('prev');
    setAnimating(true);
    setTimeout(() => {
      setSlide(s => s - 1);
      setAnimating(false);
    }, 400);
  };

  // Bắt sự kiện bàn phím
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slide, slides]);

  const current = slides[slide] || slides[0];

  // Animation classes
  const slideOutClass = animating ? (direction === 'next' ? '-translate-x-[120%] opacity-0' : 'translate-x-[120%] opacity-0') : 'translate-x-0 opacity-100';

  return (
    <div className={`relative min-h-screen w-full flex flex-col items-center justify-center p-8 transition-colors duration-500 overflow-hidden font-sans ${current.type === 'boss' ? 'bg-[#1a0b2e]' : 'bg-[#fdf3ff]'}`}
      style={{
        backgroundImage: current.type === 'boss' 
          ? `radial-gradient(circle at 15% 50%, rgba(106, 28, 246, 0.4) 0%, transparent 50%), radial-gradient(circle at 85% 30%, rgba(74, 248, 227, 0.2) 0%, transparent 50%)`
          : `radial-gradient(circle at 15% 50%, rgba(106, 28, 246, 0.08) 0%, transparent 50%), radial-gradient(circle at 85% 30%, rgba(172, 142, 255, 0.12) 0%, transparent 50%)`
      }}
    >
      
      {/* NÚT NEXT PREV */}
      <div className="fixed bottom-10 flex gap-6 z-50">
        <button onClick={goPrev} disabled={slide === 0} className={`w-[4.5rem] h-[4.5rem] bg-white text-[#6a1cf6] rounded-2xl flex items-center justify-center shadow-lg border-2 border-[#e5d5ff] transition-all transform active:scale-95 ${slide === 0 ? 'opacity-30' : 'hover:scale-110 hover:border-[#6a1cf6]'}`}>
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        <div className="flex items-center justify-center px-6 font-bold text-lg text-[#aa94c1] bg-white/50 rounded-2xl backdrop-blur-md">
          {slide + 1} / {slides.length}
        </div>
        <button onClick={goNext} disabled={slide === slides.length - 1} className={`w-[4.5rem] h-[4.5rem] bg-white text-[#6a1cf6] rounded-2xl flex items-center justify-center shadow-lg border-2 border-[#e5d5ff] transition-all transform active:scale-95 ${slide === slides.length - 1 ? 'opacity-30' : 'hover:scale-110 hover:border-[#6a1cf6]'}`}>
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
        </button>
      </div>

      <div className={`w-full max-w-7xl relative z-10 transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] flex justify-center ${slideOutClass}`}>
        
        {/* ================= COVER SLIDE ================= */}
        {current.type === 'cover' && (
          <div className="text-center flex flex-col items-center">
            <span className="px-6 py-2 rounded-full border-2 border-[#ac8eff] text-[#6a1cf6] font-bold tracking-[0.2em] mb-10 text-xl bg-white/50 backdrop-blur-lg">
              {current.badge}
            </span>
            <div className="text-[10rem] mb-6 leading-none drop-shadow-2xl animate-bounce">{current.emoji}</div>
            <h1 className="text-[#38274c] text-[5rem] md:text-[7rem] font-bold leading-[1.1] mb-6" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              {current.title}
            </h1>
            <p className="text-[#67537c] text-4xl font-semibold tracking-wider">
              {current.subtitle}
            </p>
          </div>
        )}

        {/* ================= CONTENT SLIDE ================= */}
        {current.type === 'content' && (
          <div className="w-full flex flex-col items-center text-center">
            <div className="text-7xl mb-6 drop-shadow-lg">{current.emoji}</div>
            <h2 className="text-[#38274c] text-6xl font-bold mb-8" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>{current.title}</h2>
            <p className="text-[#6a1cf6] text-3xl font-medium mb-12 bg-white/60 px-8 py-4 rounded-full shadow-sm">{current.desc}</p>
            
            <div className="w-full max-w-4xl bg-white/80 backdrop-blur-xl rounded-[3rem] p-12 shadow-[0_20px_50px_-15px_rgba(106,28,246,0.15)] border-4 border-white">
              <p className="text-[#38274c] text-4xl font-semibold mb-8 whitespace-pre-line leading-relaxed pb-8 border-b-2 border-dashed border-[#e5d5ff]">
                {current.boxTop}
              </p>
              <p className="text-[#6a1cf6] text-4xl font-bold whitespace-pre-line leading-relaxed">
                {current.boxBottom}
              </p>
            </div>
          </div>
        )}

        {/* ================= QUCIK TEST SLIDE ================= */}
        {current.type === 'quick-test' && (
          <div className="w-full flex flex-col items-center text-center">
             <div className="text-7xl mb-6 drop-shadow-lg">{current.emoji}</div>
            <h2 className="text-[#38274c] text-6xl font-bold mb-8" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>{current.title}</h2>
            <p className="text-[#67537c] text-2xl font-medium mb-12">{current.desc}</p>

            <div className="w-full flex gap-10">
               <div className="flex-1 bg-white/80 rounded-[3rem] p-10 shadow-xl border-4 border-[#e5d5ff]">
                 <p className="text-3xl text-[#38274c] font-semibold mb-10 h-24">{current.q1}</p>
                 <div className="h-24 flex items-center justify-center bg-[#f8f5ff] rounded-2xl border-2 border-[#6a1cf6]/20">
                   <p className="text-5xl font-bold text-[#6a1cf6] mix-blend-multiply opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer select-none">
                     👉 {current.a1} 👈
                   </p>
                 </div>
               </div>
               <div className="flex-1 bg-white/80 rounded-[3rem] p-10 shadow-xl border-4 border-[#e5d5ff]">
                 <p className="text-3xl text-[#38274c] font-semibold mb-10 h-24">{current.q2}</p>
                 <div className="h-24 flex items-center justify-center bg-[#f8f5ff] rounded-2xl border-2 border-[#6a1cf6]/20">
                   <p className="text-5xl font-bold text-[#6a1cf6] mix-blend-multiply opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer select-none">
                     👉 {current.a2} 👈
                   </p>
                 </div>
               </div>
            </div>
          </div>
        )}

        {/* ================= TABLE SLIDE ================= */}
        {current.type === 'table' && (
          <div className="w-full flex flex-col items-center text-center">
            <h2 className="text-[#38274c] text-6xl font-bold mb-10 flex items-center gap-6" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              <span className="text-7xl">{current.emoji}</span> {current.title}
            </h2>
            
            <div className="w-full max-w-5xl overflow-hidden rounded-[2rem] border-4 border-white shadow-[0_30px_60px_-15px_rgba(106,28,246,0.2)] bg-white/80 backdrop-blur-xl">
              <div className="flex text-3xl font-bold text-white bg-gradient-to-r from-[#6a1cf6] to-[#4af8e3] p-6">
                <div className="flex-1 text-right pr-10">{current.col1}</div>
                <div className="w-2 bg-white/30 rounded-full mx-4"></div>
                <div className="flex-1 text-left pl-10">{current.col2}</div>
              </div>
              <div className="p-4 flex flex-col gap-2">
                {current.rows?.map((r: any, i: number) => (
                  <div key={i} className="flex text-3xl font-semibold p-4 rounded-xl hover:bg-[#f8f5ff] transition-colors">
                     <div className="flex-1 text-right pr-6 text-[#67537c]">{r.c1}</div>
                     <div className="w-16 flex items-center justify-center text-[#ac8eff]">➔</div>
                     <div className="flex-1 text-left pl-6 text-[#6a1cf6]">{r.c2}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= RULES / 3 PILLARS ================= */}
        {current.type === 'rules' && (
          <div className="w-full flex flex-col items-center text-center">
            <div className="text-7xl mb-6 drop-shadow-lg">{current.emoji}</div>
            <h2 className="text-[#38274c] text-6xl font-bold mb-6" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>{current.title}</h2>
            <p className="text-[#67537c] text-3xl font-medium mb-16 max-w-4xl">{current.desc}</p>
            
            <div className="flex gap-10 w-full justify-center">
              {current.rules?.map((rule: any, i: number) => (
                <div key={i} className="w-1/3 bg-white/90 backdrop-blur-xl rounded-[3rem] p-10 flex flex-col items-center border-4 border-transparent hover:border-[#4af8e3] hover:-translate-y-4 transition-all duration-300 shadow-xl group">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#6a1cf6] to-[#ac8eff] text-white flex items-center justify-center text-5xl font-bold mb-8 group-hover:scale-110 transition-transform shadow-lg">
                    {rule.num}
                  </div>
                  <h3 className="text-4xl font-bold text-[#38274c] mb-4">{rule.name}</h3>
                  <p className="text-[#6a1cf6] text-xl font-semibold opacity-80">{rule.sub}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= CONTENT SPLIT ================= */}
        {current.type === 'content-split' && (
          <div className="w-full flex flex-col items-center text-center">
            <h2 className="text-[#38274c] text-6xl font-bold mb-14 flex items-center gap-6" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              <span className="text-7xl">{current.emoji}</span> {current.title}
            </h2>
            
            <div className="flex gap-12 w-full max-w-6xl">
              <div className="flex-1 bg-gradient-to-br from-[#fff3eb] to-white rounded-[3rem] p-12 border-4 border-[#ffb170]/30 shadow-xl whitespace-pre-line text-[#d45e00] text-3xl md:text-4xl font-bold leading-relaxed">
                {current.leftBox}
              </div>
              <div className="flex-1 bg-gradient-to-br from-[#ebf6ff] to-white rounded-[3rem] p-12 border-4 border-[#70baff]/30 shadow-xl whitespace-pre-line text-[#006bd4] text-3xl md:text-4xl font-bold leading-relaxed">
                {current.rightBox}
              </div>
            </div>
          </div>
        )}

        {/* ================= WORD SHIFT ================= */}
        {current.type === 'word-shift' && (
          <div className="w-full flex flex-col items-center text-center">
            <h2 className="text-[#38274c] text-6xl font-bold mb-12 flex items-center gap-6" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              <span className="text-7xl">{current.emoji}</span> {current.title}
            </h2>
            <div className="flex flex-wrap gap-x-12 gap-y-8 w-full max-w-6xl justify-center">
              {current.pairs?.map((pair: any, i: number) => (
                <div key={i} className="flex items-center bg-white/90 rounded-[2rem] p-6 shadow-lg border-2 border-white min-w-[calc(50%-1.5rem)] hover:scale-105 transition-transform">
                  <span className="flex-1 text-[#67537c] font-bold text-3xl text-right">{pair[0]}</span>
                  <div className="w-16 h-12 bg-[#f8f5ff] rounded-xl flex items-center justify-center mx-6 shrink-0">
                    <svg className="w-6 h-6 text-[#6a1cf6]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </div>
                  <span className="flex-1 text-[#6a1cf6] font-bold text-3xl text-left whitespace-pre-line">{pair[1]}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= BOSS ================= */}
        {current.type === 'boss' && (
          <div className="w-full flex flex-col items-center text-center pb-20">
            <div className="text-[9rem] mb-10 drop-shadow-[0_0_50px_rgba(74,248,227,0.5)] animate-pulse">{current.emoji}</div>
            <h1 className="text-white text-[6rem] font-bold mb-6" style={{ fontFamily: '"Space Grotesk", sans-serif', textShadow: '0 0 30px rgba(106,28,246,0.8)' }}>
              {current.title}
            </h1>
            <p className="text-[#bba4e5] text-3xl mb-16">{current.subtitle}</p>
            
            <button
              onClick={onComplete}
              className="group relative px-20 py-8 rounded-full bg-white text-[#1a0b2e] text-3xl font-bold overflow-hidden transition-all hover:scale-110 shadow-[0_0_80px_-10px_rgba(255,255,255,0.4)] hover:shadow-[0_0_100px_rgba(255,255,255,0.7)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#4af8e3] to-[#ac8eff] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center gap-4">
                READY TO CHECK? 
                <svg className="w-8 h-8 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
