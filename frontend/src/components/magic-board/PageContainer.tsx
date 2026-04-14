'use client';

import React, { useState } from 'react';
import GrammarSlides from './GrammarSlides';
import PresentationView from './PresentationView';
import MainMenu from './MainMenu';
import { MODULES_DATA } from '@/data/modulesData';

export default function PageContainer() {
  const [view, setView] = useState<'menu' | 'slides' | 'board'>('menu');
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);

  const activeModule = MODULES_DATA.find(m => m.id === activeModuleId);

  const handleSelectModule = (id: string) => {
    setActiveModuleId(id);
    setView('slides');
  };

  return (
    <>
      {view === 'menu' && <MainMenu onSelectModule={handleSelectModule} />}
      
      {view === 'slides' && activeModule && (
        <div className="relative">
          <button 
            onClick={() => setView('menu')}
            className="absolute top-6 left-6 z-50 flex items-center gap-2 px-6 py-4 bg-white/90 text-[#67537c] font-bold rounded-2xl border-2 border-[#e5d5ff] hover:bg-[#f8f5ff] hover:text-[#6a1cf6] hover:border-[#6a1cf6] transition-all shadow-sm"
          >
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
             MAIN MENU
          </button>
          <GrammarSlides slides={activeModule.slides} onComplete={() => setView('board')} />
        </div>
      )}

      {view === 'board' && activeModule && (
        <PresentationView 
          topicId={activeModule.id} 
          questions={activeModule.questions} 
          onBack={() => setView('slides')} 
        />
      )}
    </>
  );
}
