import React from "react";
import { SavedCreation } from "../types";
import { Trash2, BookOpen, Calendar, ChevronRight, Heart, HeartHandshake, Compass, Sparkles } from "lucide-react";
import { SPACE_LABELS } from "../data/prompts";

interface CreationHistoryProps {
  creations: SavedCreation[];
  onSelectCreation: (creation: SavedCreation) => void;
  onDeleteCreation: (id: string) => void;
  activeId?: string;
}

const SPACE_ICONS: Record<string, React.ReactNode> = {
  diary: <HeartHandshake className="w-3.5 h-3.5 text-rose-400" />,
  prose: <BookOpen className="w-3.5 h-3.5 text-sky-400" />,
  creative: <Sparkles className="w-3.5 h-3.5 text-amber-400" />,
  criticism: <Compass className="w-3.5 h-3.5 text-indigo-400" />,
};

export default function CreationHistory({ creations, onSelectCreation, onDeleteCreation, activeId }: CreationHistoryProps) {
  if (creations.length === 0) {
    return (
      <div className="text-center py-10 px-4 border border-dashed border-stone-200 rounded-xl bg-stone-50/50">
        <Heart className="w-8 h-8 text-stone-300 mx-auto mb-2" />
        <p className="text-xs text-stone-500 font-medium font-serif">Ký ức nghệ thuật trống</p>
        <p className="text-[11px] text-stone-400 mt-1 max-w-xs mx-auto">
          Các tác phẩm bạn hoàn thiện và lưu giữ sẽ hiển thị ở đây để xem lại bất cứ lúc nào.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
        <Calendar className="w-3.5 h-3.5 text-stone-400" />
        Tuyển Tập Đã Lưu ({creations.length})
      </h4>
      <div className="max-h-[350px] overflow-y-auto space-y-2 pr-1">
        {creations.map((c) => {
          const spaceInfo = SPACE_LABELS[c.space];
          const isSelected = activeId === c.id;
          
          return (
            <div
              key={c.id}
              className={`group flex items-center justify-between p-3 rounded-xl border transition-all ${
                isSelected
                  ? "bg-amber-50/40 border-amber-300/70"
                  : "bg-white border-stone-200/60 hover:bg-stone-50"
              }`}
            >
              <button
                onClick={() => onSelectCreation(c)}
                className="flex-grow text-left flex items-start gap-3 cursor-pointer min-w-0"
              >
                <div 
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: c.customBg || c.artisticSuggestion?.colorPalette?.bg || "#F5F5F5" }}
                >
                  {SPACE_ICONS[c.space] || <BookOpen className="w-3.5 h-3.5 text-stone-500" />}
                </div>
                
                <div className="min-w-0 flex-grow">
                  <h5 className="font-serif text-xs font-bold text-stone-800 truncate mb-0.5 group-hover:text-amber-700 transition-colors">
                    {c.title || "Tác phẩm không tên"}
                  </h5>
                  <div className="flex items-center gap-1.5 text-[10px] text-stone-400">
                    <span className="font-medium uppercase tracking-wide">{spaceInfo?.title || c.space}</span>
                    <span>•</span>
                    <span>{new Date(c.createdAt).toLocaleDateString("vi-VN", { month: "short", day: "numeric" })}</span>
                  </div>
                </div>
                
                <ChevronRight className="w-3.5 h-3.5 text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity mt-1 flex-shrink-0" />
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteCreation(c.id);
                }}
                className="p-1.5 rounded-lg text-stone-400 hover:text-rose-500 hover:bg-rose-50 transition-colors ml-2 cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100 flex-shrink-0"
                title="Xóa khỏi tuyển tập"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
