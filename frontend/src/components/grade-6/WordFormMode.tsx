import { useState, useRef, useEffect } from "react";
import { CheckCircle2, XCircle, Send, Loader2, ArrowLeft } from "lucide-react";
import type { WordFormQuestion } from "../../data/grade6Data";

export default function WordFormMode({
  data,
  onExit
}: {
  data: WordFormQuestion[];
  onExit: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentQ = data[currentIndex];

  useEffect(() => {
    inputRef.current?.focus();
  }, [currentIndex, feedback]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!answer.trim() || isEvaluating) return;
    
    setIsEvaluating(true);

    setTimeout(() => {
      const isCorrect = answer.trim().toLowerCase() === currentQ.expectedAnswer.toLowerCase();
      setFeedback({
        isCorrect,
        text: isCorrect
          ? "Đỉnh chóp luôn! Chuẩn 10 điểm. Từ này biến đổi quá đúng!"
          : `Rớt não hả bé ơi! Đáp án đúng phải là "${currentQ.expectedAnswer} ". Hơi lú xíu thôi, câu sau gỡ lại nha!`
      });
      setIsEvaluating(false);
    }, 800);
  };

  return (
    <div className="relative z-10 flex-grow flex flex-col max-w-6xl mx-auto w-full pt-8">
      <button 
        onClick={onExit} 
        className="inline-flex items-center text-slate-400 hover:text-emerald-400 font-medium group transition-colors mb-6 self-start text-xl"
      >
        <ArrowLeft className="w-6 h-6 mr-2 group-hover:-translate-x-1 transition-transform" />
        Quay lại Menu
      </button>

      <div className="bg-slate-800/80 rounded-3xl border border-slate-700 p-10 md:p-14 shadow-2xl backdrop-blur-xl mb-8 flex-grow flex flex-col justify-center">
        <div className="mb-6 inline-block px-4 py-2 bg-amber-500/20 text-amber-300 text-lg font-semibold rounded-xl self-start">
          Question {currentIndex + 1} of {data.length}
        </div>
        
        {currentQ.baseWord && (
          <div className="mb-8 text-3xl font-bold text-emerald-400">
            Từ gốc: <span className="uppercase tracking-widest bg-slate-900 px-6 py-3 rounded-xl ml-3 inline-block">{currentQ.baseWord}</span>
          </div>
        )}

        <h2 className="text-4xl md:text-6xl font-bold leading-snug mb-14 text-slate-100">
          {currentQ.prompt.split("_____").map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && (
                <span className="inline-block border-b-[6px] border-dashed border-emerald-500/60 w-32 md:w-48 mx-3 align-text-bottom"></span>
              )}
            </span>
          ))}
        </h2>

        <form onSubmit={handleSubmit} className="relative group">
           <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
           <div className="relative flex items-center bg-slate-900 border-2 border-slate-700 rounded-full overflow-hidden focus-within:border-emerald-500 transition-colors">
              <input
                ref={inputRef}
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={isEvaluating || feedback !== null}
                placeholder="Nhập vào đây..."
                className="w-full bg-transparent px-10 py-8 text-3xl md:text-4xl text-emerald-300 font-bold placeholder-slate-600 outline-none"
              />
              <button
                type="submit"
                disabled={!answer.trim() || isEvaluating || feedback !== null}
                className="mr-3 p-6 bg-emerald-500 text-slate-900 rounded-full hover:bg-emerald-400 disabled:opacity-50 disabled:hover:bg-emerald-500 transition-colors"
                aria-label="Submit Answer"
              >
                {isEvaluating ? <Loader2 className="w-8 h-8 animate-spin" /> : <Send className="w-8 h-8" />}
              </button>
           </div>
        </form>
      </div>

      {/* Feedback Area */}
      <div className={`transition-all duration-500 transform ${feedback ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"}`}>
        {feedback && (
          <div className={`p-6 rounded-2xl border-2 flex items-start gap-4 shadow-xl ${feedback.isCorrect ? "bg-emerald-950/50 border-emerald-500/50" : "bg-rose-950/50 border-rose-500/50"}`}>
             <div className="shrink-0 mt-1">
               {feedback.isCorrect ? <CheckCircle2 className="w-8 h-8 text-emerald-400" /> : <XCircle className="w-8 h-8 text-rose-400" />}
             </div>
             <div className="flex-grow">
               <p className={`text-lg font-medium leading-relaxed ${feedback.isCorrect ? "text-emerald-200" : "text-rose-200"}`}>
                 {feedback.text}
               </p>
               
               <div className="mt-6 flex justify-end">
                 <button
                   onClick={() => {
                     if (currentIndex < data.length - 1) {
                       setCurrentIndex(prev => prev + 1);
                       setAnswer("");
                       setFeedback(null);
                     } else {
                       onExit();
                     }
                   }}
                   className="px-6 py-2 bg-slate-100 text-slate-900 font-bold rounded-full hover:bg-white transition-colors"
                 >
                   {currentIndex < data.length - 1 ? "Câu tiếp theo" : "Hoàn thành"} 
                 </button>
               </div>
             </div>
          </div>
        )}
     </div>
    </div>
  );
}
