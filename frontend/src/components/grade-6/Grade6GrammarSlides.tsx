import { Sparkles } from "lucide-react";

export const grade6Slides = [
  {
    id: "g6_slide_1",
    type: "theory",
    title: "1. Possessive Pronouns",
    subtitle: "Đại từ sở hữu - Bí kíp chống lặp từ",
    content: (
      <div className="space-y-6">
        <p className="text-xl text-slate-300">
          Dùng để thay thế cho những từ đã được nói đến trước đó nhằm tránh sự lặp lại.
        </p>
        <div className="overflow-hidden rounded-xl border border-slate-700">
          <table className="w-full text-left text-lg">
            <thead className="bg-slate-800/80">
              <tr>
                <th className="p-4 text-emerald-400 font-bold">I</th>
                <th className="p-4 text-emerald-400 font-bold">You</th>
                <th className="p-4 text-emerald-400 font-bold">We</th>
                <th className="p-4 text-emerald-400 font-bold">They</th>
                <th className="p-4 text-emerald-400 font-bold">He</th>
                <th className="p-4 text-emerald-400 font-bold">She</th>
              </tr>
            </thead>
            <tbody className="bg-slate-800/40">
              <tr>
                <td className="p-4 text-pink-300 font-medium border-t border-slate-700">Mine</td>
                <td className="p-4 text-pink-300 font-medium border-t border-slate-700">Yours</td>
                <td className="p-4 text-pink-300 font-medium border-t border-slate-700">Ours</td>
                <td className="p-4 text-pink-300 font-medium border-t border-slate-700">Theirs</td>
                <td className="p-4 text-pink-300 font-medium border-t border-slate-700">His</td>
                <td className="p-4 text-pink-300 font-medium border-t border-slate-700">Hers</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bg-slate-800/80 p-4 rounded-xl border-l-4 border-emerald-500">
          <p className="font-mono text-emerald-300">What’s your dream? - <span className="text-pink-400">Mine</span> is to become a doctor.</p>
        </div>
      </div>
    ),
  },
  {
    id: "g6_slide_2",
    type: "theory",
    title: "2. Reported Speech",
    subtitle: "Câu tường thuật - Bí thuật kể lại lời đồn",
    content: (
      <div className="space-y-6">
        <p className="text-xl text-slate-300">
          Để tường thuật lại điều ai đó đã nói: <span className="text-pink-400 font-bold">Lùi 1 thì</span> và đổi đại từ phù hợp.
        </p>
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <h3 className="text-emerald-400 font-bold mb-4 uppercase tracking-wider">A. Dạng câu kể (Statements)</h3>
          <ul className="space-y-4 text-lg">
            <li className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <span>S1 + said (that) + S2 + V (lùi thì)</span>
            </li>
            <li className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <span>S1 + told + O (that) + S2 + V (lùi thì)</span>
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "g6_slide_3",
    type: "theory",
    title: "3. Reported Questions",
    subtitle: "Tường thuật câu hỏi - Không chia lại trợ động từ!",
    content: (
      <div className="space-y-6">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-inner">
             <h3 className="text-pink-400 font-bold mb-4 uppercase">Yes/No Questions</h3>
             <p className="font-mono text-emerald-300 text-sm md:text-base leading-relaxed">
               S + asked + if/whether + S + V (lùi thì)
             </p>
           </div>
           
           <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-inner">
             <h3 className="text-pink-400 font-bold mb-4 uppercase">Wh- Questions</h3>
             <p className="font-mono text-emerald-300 text-sm md:text-base leading-relaxed">
               S + asked + Wh-word + S + V (lùi thì)
             </p>
           </div>
         </div>

         <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
           <p className="text-amber-300"><strong>Lưu ý chí mạng:</strong> Đổi thì (now → then, today → that day) và tuyệt đối đưa câu hỏi về cấu trúc khẳng định ngang hàng <code>(S + V)</code>.</p>
         </div>
      </div>
    ),
  }
];

export default function Grade6GrammarSlides({
  currentSlide,
  onNext,
  onPrev,
  isFirst,
  isLast,
  onStartGame
}: {
  currentSlide: number;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
  onStartGame: () => void;
}) {
  const slide = grade6Slides[currentSlide];

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col h-[75vh]">
      {/* ProgressBar */}
      <div className="w-full bg-slate-800 h-2 rounded-full mb-8 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-green-400 to-emerald-500 h-full transition-all duration-500 ease-out"
          style={{ width: `${((currentSlide + 1) / grade6Slides.length) * 100}%` }}
        />
      </div>

      <div className="flex-grow bg-slate-800/80 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px]" />
        
        <div className="relative z-10">
          <div className="inline-block px-4 py-1.5 bg-emerald-500/20 text-emerald-300 text-sm font-semibold rounded-full mb-6">
            Lý thuyết Ôn tập
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400">
            {slide.title}
          </h2>
          <p className="text-xl text-emerald-400 font-medium mb-10">{slide.subtitle}</p>
          
          <div className="animate-fade-in-up">
            {slide.content}
          </div>
        </div>

        {/* Navigation Buttons inside slide card */}
        <div className="mt-auto pt-8 flex items-center justify-between relative z-10">
          <button
            onClick={onPrev}
            disabled={isFirst}
            className="px-6 py-3 rounded-full font-bold text-slate-300 border border-slate-600 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            Quay lại
          </button>
          
          {isLast ? (
            <button
              onClick={onStartGame}
              className="px-8 py-3 rounded-full font-bold text-slate-900 bg-gradient-to-r from-green-400 to-emerald-400 hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(52,211,153,0.4)] animate-pulse"
            >
              Vào Game Mode 🚀
            </button>
          ) : (
            <button
              onClick={onNext}
              className="px-8 py-3 rounded-full font-bold text-slate-900 bg-slate-100 hover:bg-white transition-colors"
            >
              Tiếp tục
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
