"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, XCircle, Volume2, BookOpen, Type, PenLine } from "lucide-react";
import { grade6MCPronunciation, grade6MCGrammar, grade6WordForms, grade6Rewriting } from "../../data/grade6Data";
import type { MultipleChoiceQuestion, WordFormQuestion } from "../../data/grade6Data";
import Grade6GrammarSlides, { grade6Slides } from "../../components/grade-6/Grade6GrammarSlides";
import WordFormMode from "../../components/grade-6/WordFormMode";

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

// --- Multiple Choice Engine ---
function MultipleChoiceEngine({
  data,
  onExit,
  accentColor,
}: {
  data: MultipleChoiceQuestion[];
  onExit: () => void;
  accentColor: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const current = data[currentIndex];

  const handleSelect = (key: string) => {
    if (isEvaluating || selectedAnswer) return;
    setSelectedAnswer(key);
    setIsEvaluating(true);
    setTimeout(() => {
      const isCorrect = key === current.correctAnswer;
      setFeedback({
        isCorrect,
        text: isCorrect
          ? `Đỉnh chóp! Chính xác 100%. ${current.explanation}`
          : `Sai rồi bé ơi! Đáp án đúng là ${current.correctAnswer}. ${current.explanation}`,
      });
      setIsEvaluating(false);
    }, 600);
  };

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex((p) => p + 1);
      setSelectedAnswer(null);
      setFeedback(null);
    } else {
      onExit();
    }
  };

  return (
    <div className="relative z-10 flex-grow flex flex-col max-w-5xl mx-auto w-full pt-6">
      {/* Back + Progress */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onExit}
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors group min-h-[44px] px-3"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Quay lại</span>
        </button>
        <div className="flex-grow bg-slate-700/60 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${accentColor}`}
            style={{ width: `${((currentIndex + 1) / data.length) * 100}%` }}
          />
        </div>
        <span className="text-slate-400 text-sm font-medium shrink-0">
          {currentIndex + 1}/{data.length}
        </span>
      </div>

      {/* Question Card */}
      <div className="bg-slate-800/70 rounded-3xl border border-slate-700/60 p-8 md:p-12 shadow-2xl backdrop-blur-xl mb-6 flex-grow flex flex-col justify-center">
        <p className="text-4xl md:text-5xl font-bold leading-snug text-slate-100 mb-10">
          {current.question}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(current.options).map(([key, value]) => {
            const isSelected = selectedAnswer === key;
            const isCorrectKey = key === current.correctAnswer;
            let style = "border-slate-600 bg-slate-700/50 hover:border-slate-400 hover:bg-slate-700";
            if (feedback) {
              if (isCorrectKey) style = "border-emerald-500 bg-emerald-900/30 text-emerald-200";
              else if (isSelected && !isCorrectKey) style = "border-rose-500 bg-rose-900/30 text-rose-200";
            }
            return (
              <button
                key={key}
                disabled={!!selectedAnswer}
                onClick={() => handleSelect(key)}
                className={`relative flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all duration-250 text-xl font-medium min-h-[64px] ${style} ${!selectedAnswer ? "hover:shadow-lg" : ""}`}
              >
                <span className="w-10 h-10 rounded-full bg-slate-900/60 flex items-center justify-center font-bold text-lg shrink-0">
                  {key}
                </span>
                <span className="leading-snug">{value}</span>
                {feedback && isCorrectKey && (
                  <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-emerald-400" />
                )}
                {feedback && isSelected && !isCorrectKey && (
                  <XCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-rose-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback */}
      <div
        className={`transition-all duration-400 overflow-hidden ${feedback ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}
      >
        {feedback && (
          <div
            className={`p-6 rounded-2xl border flex items-start gap-4 shadow-xl mb-4 ${feedback.isCorrect ? "bg-emerald-950/60 border-emerald-500/40" : "bg-rose-950/60 border-rose-500/40"}`}
          >
            <div className="shrink-0 mt-0.5">
              {feedback.isCorrect ? (
                <CheckCircle2 className="w-7 h-7 text-emerald-400" />
              ) : (
                <XCircle className="w-7 h-7 text-rose-400" />
              )}
            </div>
            <p className={`text-lg leading-relaxed flex-grow ${feedback.isCorrect ? "text-emerald-200" : "text-rose-200"}`}>
              {feedback.text}
            </p>
            <button
              onClick={handleNext}
              className="shrink-0 px-6 py-2 bg-slate-100 text-slate-900 font-bold rounded-full hover:bg-white transition-colors min-h-[44px]"
            >
              {currentIndex < data.length - 1 ? "Tiếp" : "Xong"}
            </button>
          </div>
        )}
      </div>
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
