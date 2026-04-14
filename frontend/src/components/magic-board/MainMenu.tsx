'use client';

import React from 'react';
import { MODULES_DATA } from '@/data/modulesData';

export default function MainMenu({ onSelectModule }: { onSelectModule: (moduleId: string) => void }) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-8 bg-[#fdf3ff]"
      style={{
        backgroundImage: `radial-gradient(circle at 15% 50%, rgba(106, 28, 246, 0.08) 0%, transparent 50%), radial-gradient(circle at 85% 30%, rgba(172, 142, 255, 0.12) 0%, transparent 50%)`
      }}
    >
      <div className="text-center mb-16 animate-[fade-in-down_0.8s_forwards]">
        <h1 className="text-[5rem] font-bold text-[#38274c] mb-4" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>THE MAGIC BOARD</h1>
        <p className="text-2xl text-[#67537c] font-medium tracking-wide">ENGLISH 8 - SEMESTER 2 REVIEW</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl animate-[fade-in-up_0.8s_forwards]" style={{ animationDelay: '100ms' }}>
        {MODULES_DATA.map((mod) => (
          <button
            key={mod.id}
            onClick={() => onSelectModule(mod.id)}
            className="group relative bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] border-4 border-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-300 text-left overflow-hidden"
            style={{ boxShadow: `0 20px 40px -15px ${mod.shadowColor}` }}
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${mod.color} rounded-bl-[100px] opacity-20 group-hover:opacity-100 transition-opacity duration-500`}></div>
            <div className="absolute top-6 right-8 text-5xl opacity-50 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300 transform origin-top-right">
              {mod.emoji}
            </div>
            
            <h2 className="text-4xl font-bold text-[#38274c] mb-4 relative z-10 w-3/4 leading-tight">{mod.title}</h2>
            <p className="text-xl text-[#6a1cf6] font-semibold relative z-10">{mod.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
