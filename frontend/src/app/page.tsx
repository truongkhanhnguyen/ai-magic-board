import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export default function PortalPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-4 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
      <div className="absolute top-[40%] left-[40%] w-[20%] h-[20%] bg-pink-500/10 rounded-full blur-[80px]" />

      <div className="relative z-10 flex flex-col items-center max-w-4xl w-full">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700 backdrop-blur-sm mb-8 animate-fade-in-up">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span className="text-sm font-medium text-slate-300">Welcome to AI Magic Board</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-center mb-6 tracking-tight drop-shadow-sm">
          Select Your Mission
        </h1>
        
        <p className="text-xl text-slate-400 text-center mb-16 max-w-2xl font-light">
          Choose your grade level below to enter the interactive AI training zone.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full px-4 md:px-12">
          {/* Grade 6 Link */}
          <Link href="/grade-6" className="group relative w-full">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
            <div className="relative flex flex-col h-full p-8 bg-slate-800 border border-slate-700/50 rounded-3xl hover:bg-slate-800/80 transition-all duration-300">
              <div className="text-4xl mb-4">🚀</div>
              <h2 className="text-3xl font-bold text-white mb-2">Grade 6</h2>
              <p className="text-emerald-300 font-medium mb-4">Beginner Explorer</p>
              <p className="text-slate-400 mb-8 flex-grow">
                Master signs, multiple choice battles, and word forms.
              </p>
              <div className="flex items-center text-emerald-400 font-bold group-hover:translate-x-2 transition-transform duration-300">
                Enter Arena <ArrowRight className="ml-2 w-5 h-5" />
              </div>
            </div>
          </Link>

          {/* Grade 8 Link */}
          <Link href="/grade-8" className="group relative w-full">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
            <div className="relative flex flex-col h-full p-8 bg-slate-800 border border-slate-700/50 rounded-3xl hover:bg-slate-800/80 transition-all duration-300">
              <div className="text-4xl mb-4">👽</div>
              <h2 className="text-3xl font-bold text-white mb-2">Grade 8</h2>
              <p className="text-pink-300 font-medium mb-4">Advanced Transformer</p>
              <p className="text-slate-400 mb-8 flex-grow">
                Master sentence transformations with our cosmic AI cat.
              </p>
              <div className="flex items-center text-pink-400 font-bold group-hover:translate-x-2 transition-transform duration-300">
                Enter Magic Board <ArrowRight className="ml-2 w-5 h-5" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
