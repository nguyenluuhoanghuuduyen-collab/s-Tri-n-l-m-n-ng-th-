import React from "react";
import { CreativeSpace, TopicPrompt } from "../types";
import { TOPIC_PROMPTS } from "../data/prompts";
import { Sparkles, HelpCircle, PenTool } from "lucide-react";

interface PromptSuggestionsProps {
  space: CreativeSpace;
  onSelectPrompt: (prompt: TopicPrompt) => void;
  onSelectDirective: (directive: string) => void;
}

const DIRECTIVES: Record<CreativeSpace, string[]> = {
  diary: ["Xoa dịu thấu cảm", "Sâu lắng nội tâm", "Chữa lành nhẹ nhàng", "Mộc mạc chân thành"],
  prose: ["Đượm buồn chiêm nghiệm", "Bay bổng triết học", "Tươi sáng hy vọng", "Hoài niệm quá khứ"],
  creative: ["Dạt dào vần điệu (Thơ)", "Huyền ảo cổ tích", "Tối giản hiện đại", "Giàu hình tượng kịch tính"],
  criticism: ["Phân tích học thuật sâu", "Cảm thụ tinh tế sắc bén", "Lập luận đa chiều", "Độc đáo cá tính"],
};

export default function PromptSuggestions({ space, onSelectPrompt, onSelectDirective }: PromptSuggestionsProps) {
  const prompts = TOPIC_PROMPTS[space] || [];
  const directives = DIRECTIVES[space] || [];

  return (
    <div className="space-y-5">
      {/* Writing Prompts */}
      <div>
        <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <PenTool className="w-3.5 h-3.5 text-amber-500" />
          Đề Tài Gợi Ý Để Bắt Đầu
        </h4>
        <div className="grid grid-cols-1 gap-3">
          {prompts.map((p) => (
            <button
              key={p.id}
              onClick={() => onSelectPrompt(p)}
              className="group text-left p-3.5 rounded-xl border border-stone-200/60 bg-stone-50/50 hover:bg-amber-50/20 hover:border-amber-200/70 transition-all shadow-xs cursor-pointer"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-serif text-sm font-semibold text-stone-800 group-hover:text-amber-700 transition-colors">
                  {p.title}
                </span>
                <span className="text-[10px] bg-stone-100 text-stone-500 px-2 py-0.5 rounded-md group-hover:bg-amber-100/50 group-hover:text-amber-700 transition-colors">
                  Gợi ý
                </span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed mb-2">
                {p.description}
              </p>
              <div className="flex gap-1.5 items-start text-[11px] text-stone-500 bg-stone-100/40 group-hover:bg-amber-50/50 p-2 rounded-lg border border-dotted border-stone-200 group-hover:border-amber-200/30">
                <HelpCircle className="w-3 h-3 text-amber-500 flex-shrink-0 mt-0.5" />
                <span className="italic leading-normal">{p.hint}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Directives / Creative Modifiers */}
      <div>
        <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Phong Cách Đọc & Viết (Directives)
        </h4>
        <p className="text-[11px] text-stone-400 mb-2.5">
          Bấm để thêm yêu cầu định hướng cảm xúc nghệ thuật của Nàng Thơ:
        </p>
        <div className="flex flex-wrap gap-2">
          {directives.map((dir) => (
            <button
              key={dir}
              onClick={() => onSelectDirective(dir)}
              className="px-3 py-1.5 rounded-full text-xs bg-white border border-stone-200 text-stone-600 hover:border-amber-300 hover:text-amber-700 hover:bg-amber-50/20 transition-all cursor-pointer shadow-2xs"
            >
              + {dir}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
