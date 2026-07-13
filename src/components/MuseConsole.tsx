import React, { useState } from "react";
import { CreativeSpace, MuseResponse, SavedCreation, TopicPrompt } from "../types";
import { SPACE_LABELS } from "../data/prompts";
import { Send, Sparkles, Feather, HelpCircle, Save, CheckCircle2, ChevronRight, MessageSquare, BookOpen, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface MuseConsoleProps {
  space: CreativeSpace;
  subType: string;
  setSubType: (type: string) => void;
  rawContent: string;
  setRawContent: (content: string) => void;
  promptHint: string;
  setPromptHint: (hint: string) => void;
  loading: boolean;
  onGenerate: () => void;
  response: MuseResponse | null;
  onSaveCreation: () => void;
  isSaved: boolean;
  error: string | null;
  onOpenSettings?: () => void;
}

export default function MuseConsole({
  space,
  subType,
  setSubType,
  rawContent,
  setRawContent,
  promptHint,
  setPromptHint,
  loading,
  onGenerate,
  response,
  onSaveCreation,
  isSaved,
  error,
  onOpenSettings,
}: MuseConsoleProps) {
  const spaceInfo = SPACE_LABELS[space];

  const handleQuestionClick = (q: string) => {
    setPromptHint(`Phát triển dựa trên câu hỏi: "${q}"`);
    // Scroll smoothly to prompt target
    document.getElementById("prompt-hint-input")?.focus();
  };

  return (
    <div className="space-y-6">
      {/* Space Header & Info Card */}
      <div className="p-5 bg-gradient-to-br from-amber-50/60 to-stone-50 border border-amber-100/40 rounded-2xl">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 bg-amber-100/50 rounded-xl text-amber-800">
            <Feather className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-lg font-bold text-stone-800 flex items-center gap-2">
              {spaceInfo.title}
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-normal uppercase tracking-wider">
                {spaceInfo.subtitle}
              </span>
            </h2>
            <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
              {spaceInfo.description}
            </p>
          </div>
        </div>

        {/* Sub-type customizer for Creative Writing */}
        {space === "creative" && (
          <div className="mt-4 flex items-center gap-2">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Thể loại:</span>
            <div className="flex gap-1.5">
              {["Thơ", "Truyện ngắn", "Kịch bản", "Khác"].map((type) => (
                <button
                  key={type}
                  onClick={() => setSubType(type)}
                  className={`px-3 py-1 text-xs rounded-full border transition-all cursor-pointer ${
                    subType === type
                      ? "bg-amber-600 text-white border-amber-700 shadow-xs"
                      : "bg-white text-stone-600 border-stone-200 hover:border-amber-300"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Draft Input Workspace */}
      <div className="p-5 bg-white border border-stone-100 rounded-2xl shadow-xs space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-stone-400" />
              Bản thảo suy nghĩ thô của bạn
            </label>
            <span className="text-[10px] text-stone-400 font-mono">
              {rawContent.length} ký tự
            </span>
          </div>
          <textarea
            value={rawContent}
            onChange={(e) => setRawContent(e.target.value)}
            placeholder="Hãy đặt bút xuống và viết ra những suy nghĩ tự nhiên nhất của bạn... Cho dù đó là những mảnh cảm xúc vỡ vụn, một câu chuyện chưa hồi kết, hay chỉ là những góc nhìn sơ khởi..."
            className="w-full h-44 px-4 py-3 border border-stone-200 rounded-xl text-sm leading-relaxed bg-stone-50/30 text-stone-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-amber-500/30 focus:border-amber-500 transition-all placeholder:text-stone-400"
          />
        </div>

        {/* Prompt/Directive Hint */}
        <div>
          <label className="block text-xs font-semibold text-stone-500 mb-1.5 uppercase tracking-wider">
            Yêu cầu riêng / Định hướng nghệ thuật
          </label>
          <input
            id="prompt-hint-input"
            type="text"
            value={promptHint}
            onChange={(e) => setPromptHint(e.target.value)}
            placeholder="Ví dụ: Tăng chất thơ buồn, dịch theo thể thơ lục bát, viết theo phong cách hoài cổ..."
            className="w-full px-3.5 py-2.5 border border-stone-200 rounded-xl text-xs bg-stone-50/30 text-stone-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-amber-500/30 focus:border-amber-500 transition-all placeholder:text-stone-400"
          />
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onGenerate}
            disabled={loading || !rawContent.trim()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-amber-700 hover:bg-amber-800 disabled:bg-stone-200 disabled:text-stone-400 text-white font-medium px-6 py-3 rounded-xl text-sm transition-all shadow-md hover:shadow-lg disabled:shadow-none active:scale-98 cursor-pointer"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Nàng Thơ đang cảm thụ...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Thỉnh cầu Nàng Thơ
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5 text-xs text-rose-700">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Lỗi cấu hình hoặc kết nối</p>
            <p className="mt-0.5 leading-relaxed">{error}</p>
            {(error.toLowerCase().includes("api key") || error.toLowerCase().includes("khóa")) && onOpenSettings && (
              <button 
                onClick={onOpenSettings}
                className="mt-2 text-[11px] font-semibold text-rose-800 underline hover:text-rose-950 block cursor-pointer"
              >
                Cài đặt API Key của bạn ngay
              </button>
            )}
          </div>
        </div>
      )}

      {/* Muse Response Section */}
      <AnimatePresence>
        {response && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-5"
          >
            {/* Companion Feedback Card */}
            <div className="bg-white border border-stone-100 rounded-2xl p-5 shadow-xs space-y-4">
              
              {/* Inspiration Spark */}
              <div>
                <h4 className="text-[10px] uppercase font-mono tracking-widest text-amber-600 mb-1 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  Lời Dẫn từ Nàng Thơ (Spark)
                </h4>
                <p className="font-serif text-sm italic text-stone-700 leading-relaxed border-l-2 border-amber-200/60 pl-3">
                  "{response.inspirationSpark}"
                </p>
              </div>

              <div className="h-px bg-stone-100" />

              {/* Refined content visual highlight */}
              <div>
                <h4 className="text-[10px] uppercase font-mono tracking-widest text-stone-500 mb-2">
                  Tác Phẩm Được Chau Chuốt
                </h4>
                <div className="bg-stone-50 p-4 rounded-xl text-stone-800 text-sm leading-relaxed whitespace-pre-wrap font-serif">
                  {response.refinedContent}
                </div>
              </div>

              {/* Reflective Questions */}
              {response.questions && response.questions.length > 0 && (
                <div className="p-3.5 bg-amber-50/20 border border-amber-200/30 rounded-xl space-y-2">
                  <h4 className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-amber-600" />
                    Khơi gợi suy ngẫm (Kích thích tư duy)
                  </h4>
                  <p className="text-xs text-stone-500 leading-normal">
                    Để bài viết thêm chiều sâu tinh tế, bạn có muốn suy ngẫm thêm các câu hỏi này không? Bấm để làm chủ đề tiếp theo:
                  </p>
                  <div className="space-y-1.5 pt-1">
                    {response.questions.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuestionClick(q)}
                        className="w-full text-left p-2 rounded-lg hover:bg-amber-100/30 text-xs text-amber-800 flex items-start gap-1.5 transition-colors group cursor-pointer border border-transparent hover:border-amber-200/20"
                      >
                        <ChevronRight className="w-3.5 h-3.5 mt-0.5 text-amber-500/50 group-hover:text-amber-700 flex-shrink-0" />
                        <span className="font-serif leading-normal">{q}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Closing thought */}
              <div className="text-xs text-stone-500 italic text-center pt-2">
                {response.closingThought}
              </div>

              {/* Action: Save creation to history */}
              <div className="pt-3 border-t border-stone-100 flex justify-end">
                <button
                  onClick={onSaveCreation}
                  disabled={isSaved}
                  className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer ${
                    isSaved
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-stone-800 hover:bg-stone-900 text-white hover:shadow-md active:scale-98"
                  }`}
                >
                  {isSaved ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Đã Lưu Tuyển Tập
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Lưu Vào Tuyển Tập
                    </>
                  )}
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
