import React, { useRef, useState, useEffect } from "react";
import { SavedCreation } from "../types";
import { PASTEL_BACKGROUNDS, FONT_PAIRINGS } from "../data/prompts";
import { toPng } from "html-to-image";
import { Download, RefreshCw, Palette, AlignLeft, AlignCenter, AlignRight, AlignJustify, Sparkles, Check, Copy, Image } from "lucide-react";
import { motion } from "motion/react";

interface VisualCanvasProps {
  creation: Partial<SavedCreation> & { title: string; refinedContent: string };
  onUpdateCustomization?: (customizations: {
    title?: string;
    customBg?: string;
    customText?: string;
    customAccent?: string;
    customDisplayFont?: string;
    customBodyFont?: string;
    customFontSize?: "sm" | "base" | "lg" | "xl" | "2xl";
    customAlignment?: "left" | "center" | "right" | "justify";
  }) => void;
}

export default function VisualCanvas({ creation, onUpdateCustomization }: VisualCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [showDecorations, setShowDecorations] = useState(true);
  const [titleText, setTitleText] = useState(creation.title || "Tác phẩm Không Tên");

  // Copy states
  const [copiedText, setCopiedText] = useState(false);
  const [copyingImage, setCopyingImage] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);

  // Local customized states, synchronized with creation properties
  const [bg, setBg] = useState(creation.customBg || creation.artisticSuggestion?.colorPalette?.bg || "#FDFBF7");
  const [text, setText] = useState(creation.customText || creation.artisticSuggestion?.colorPalette?.text || "#2D2526");
  const [accent, setAccent] = useState(creation.customAccent || creation.artisticSuggestion?.colorPalette?.accent || "#8A5A44");
  const [displayFont, setDisplayFont] = useState(creation.customDisplayFont || creation.artisticSuggestion?.fontPairing?.displayFont || "Playfair Display");
  const [bodyFont, setBodyFont] = useState(creation.customBodyFont || creation.artisticSuggestion?.fontPairing?.bodyFont || "Inter");
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg" | "xl" | "2xl">(creation.customFontSize || "base");
  const [alignment, setAlignment] = useState<"left" | "center" | "right" | "justify">(creation.customAlignment || "center");

  useEffect(() => {
    // Sync with new creations
    setBg(creation.customBg || creation.artisticSuggestion?.colorPalette?.bg || "#FDFBF7");
    setText(creation.customText || creation.artisticSuggestion?.colorPalette?.text || "#2D2526");
    setAccent(creation.customAccent || creation.artisticSuggestion?.colorPalette?.accent || "#8A5A44");
    setDisplayFont(creation.customDisplayFont || creation.artisticSuggestion?.fontPairing?.displayFont || "Playfair Display");
    setBodyFont(creation.customBodyFont || creation.artisticSuggestion?.fontPairing?.bodyFont || "Inter");
    setFontSize(creation.customFontSize || "base");
    setAlignment(creation.customAlignment || "center");
    setTitleText(creation.title || "Tác phẩm Không Tên");
  }, [creation]);

  const handleCustomChange = (updatedFields: Parameters<NonNullable<typeof onUpdateCustomization>>[0]) => {
    if (onUpdateCustomization) {
      onUpdateCustomization(updatedFields);
    }
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(creation.refinedContent || "");
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  const handleCopyImage = async () => {
    if (!canvasRef.current) return;
    setCopyingImage(true);
    try {
      // Small timeout to ensure visual rendering
      await new Promise((resolve) => setTimeout(resolve, 300));
      const dataUrl = await toPng(canvasRef.current, {
        quality: 0.98,
        pixelRatio: 2,
        style: {
          transform: "scale(1)",
          borderRadius: "0",
        },
      });
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
      setCopiedImage(true);
      setTimeout(() => setCopiedImage(false), 2000);
    } catch (error) {
      console.error("Failed to copy image to clipboard:", error);
    } finally {
      setCopyingImage(false);
    }
  };

  const handleDownload = async () => {
    if (!canvasRef.current) return;
    setDownloading(true);
    try {
      // Small timeout to ensure everything has rendered
      await new Promise((resolve) => setTimeout(resolve, 300));
      const dataUrl = await toPng(canvasRef.current, {
        quality: 0.98,
        pixelRatio: 2, // ultra high-res!
        style: {
          transform: "scale(1)",
          borderRadius: "0", // Clean square image for downloads
        },
      });
      
      const link = document.createElement("a");
      link.download = `${titleText.toLowerCase().replace(/\s+/g, "_") || "tac_pham_tho_mong"}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Failed to export card:", error);
    } finally {
      setDownloading(false);
    }
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case "sm": return "text-sm leading-relaxed";
      case "lg": return "text-lg md:text-xl leading-relaxed md:leading-loose";
      case "xl": return "text-xl md:text-2xl leading-loose";
      case "2xl": return "text-2xl md:text-3xl leading-loose font-light";
      case "base":
      default:
        return "text-base md:text-lg leading-relaxed md:leading-loose";
    }
  };

  const getAlignmentClass = () => {
    switch (alignment) {
      case "left": return "text-left";
      case "right": return "text-right";
      case "justify": return "text-justify";
      case "center":
      default:
        return "text-center";
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Visual Workspace Controller */}
      <div className="p-5 bg-white border border-stone-100 rounded-2xl shadow-xs">
        <h3 className="font-serif text-lg font-medium text-stone-800 flex items-center gap-2 mb-4">
          <Palette className="w-4 h-4 text-amber-600" />
          Phòng Trưng Bày & Thiết Kế
        </h3>
        
        {/* Title Input */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-stone-500 mb-1.5 uppercase tracking-wider">Đặt tiêu đề tác phẩm</label>
          <input
            type="text"
            value={titleText}
            onChange={(e) => {
              setTitleText(e.target.value);
              handleCustomChange({ title: e.target.value });
            }}
            placeholder="Tác phẩm không tên..."
            className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm bg-stone-50 text-stone-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-amber-500/30 focus:border-amber-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pastel Palettes */}
          <div>
            <label className="block text-xs font-medium text-stone-500 mb-2 uppercase tracking-wider">Bảng màu Pastel</label>
            <div className="flex flex-wrap gap-2">
              {PASTEL_BACKGROUNDS.map((pal) => {
                const isActive = bg === pal.value;
                return (
                  <button
                    key={pal.name}
                    onClick={() => {
                      setBg(pal.value);
                      setText(pal.text);
                      setAccent(pal.accent);
                      handleCustomChange({
                        customBg: pal.value,
                        customText: pal.text,
                        customAccent: pal.accent,
                      });
                    }}
                    title={pal.name}
                    className={`group relative w-7 h-7 rounded-full border transition-all ${
                      isActive ? "border-stone-800 scale-110 shadow-sm" : "border-stone-200 hover:scale-105"
                    }`}
                    style={{ backgroundColor: pal.value }}
                  >
                    {isActive && (
                      <Check className="w-3.5 h-3.5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ color: pal.text }} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Font Pairings */}
          <div>
            <label className="block text-xs font-medium text-stone-500 mb-2 uppercase tracking-wider">Cặp chữ nghệ thuật</label>
            <div className="grid grid-cols-1 gap-1.5">
              {FONT_PAIRINGS.map((font) => {
                const isActive = displayFont === font.displayFont && bodyFont === font.bodyFont;
                return (
                  <button
                    key={font.name}
                    onClick={() => {
                      setDisplayFont(font.displayFont);
                      setBodyFont(font.bodyFont);
                      handleCustomChange({
                        customDisplayFont: font.displayFont,
                        customBodyFont: font.bodyFont,
                      });
                    }}
                    className={`px-3 py-1.5 text-left text-xs rounded-lg border transition-all flex items-center justify-between ${
                      isActive 
                        ? "bg-amber-50/50 border-amber-300/60 text-stone-800 font-medium" 
                        : "bg-stone-50/50 border-stone-200 text-stone-600 hover:bg-stone-50"
                    }`}
                  >
                    <span className="truncate">{font.name}</span>
                    <span className="text-[10px] text-stone-400 font-serif">Aa</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="h-px bg-stone-100 my-4" />

        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Font Size Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">Cỡ chữ:</span>
            <div className="flex bg-stone-100 p-0.5 rounded-lg border border-stone-200">
              {(["sm", "base", "lg", "xl"] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setFontSize(size);
                    handleCustomChange({ customFontSize: size });
                  }}
                  className={`px-2.5 py-1 text-xs rounded-md transition-all uppercase ${
                    fontSize === size
                      ? "bg-white text-stone-800 font-semibold shadow-xs"
                      : "text-stone-500 hover:text-stone-800"
                  }`}
                >
                  {size === "base" ? "md" : size}
                </button>
              ))}
            </div>
          </div>

          {/* Alignment Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">Căn lề:</span>
            <div className="flex bg-stone-100 p-0.5 rounded-lg border border-stone-200">
              <button
                onClick={() => { setAlignment("left"); handleCustomChange({ customAlignment: "left" }); }}
                className={`p-1.5 rounded-md transition-all ${alignment === "left" ? "bg-white text-stone-800 shadow-xs" : "text-stone-500 hover:text-stone-800"}`}
              >
                <AlignLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => { setAlignment("center"); handleCustomChange({ customAlignment: "center" }); }}
                className={`p-1.5 rounded-md transition-all ${alignment === "center" ? "bg-white text-stone-800 shadow-xs" : "text-stone-500 hover:text-stone-800"}`}
              >
                <AlignCenter className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => { setAlignment("right"); handleCustomChange({ customAlignment: "right" }); }}
                className={`p-1.5 rounded-md transition-all ${alignment === "right" ? "bg-white text-stone-800 shadow-xs" : "text-stone-500 hover:text-stone-800"}`}
              >
                <AlignRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => { setAlignment("justify"); handleCustomChange({ customAlignment: "justify" }); }}
                className={`p-1.5 rounded-md transition-all ${alignment === "justify" ? "bg-white text-stone-800 shadow-xs" : "text-stone-500 hover:text-stone-800"}`}
              >
                <AlignJustify className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Toggle Watercolor Graphics */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">Đồ họa màu nước:</span>
            <button
              onClick={() => setShowDecorations(!showDecorations)}
              className={`px-3 py-1 text-xs rounded-lg border transition-all ${
                showDecorations
                  ? "bg-amber-500 text-white border-amber-600 font-medium"
                  : "bg-stone-50 text-stone-600 border-stone-200"
              }`}
            >
              {showDecorations ? "Bật" : "Tắt"}
            </button>
          </div>
        </div>
      </div>

      {/* The Visual Canvas Card */}
      <div className="relative group">
        <div
          ref={canvasRef}
          id="muse-art-card"
          className="relative w-full overflow-hidden border border-stone-200 rounded-3xl p-8 md:p-14 transition-all shadow-md flex flex-col items-center justify-between min-h-[500px]"
          style={{
            backgroundColor: bg,
            color: text,
            fontFamily: bodyFont === "Inter" ? "var(--font-sans)" : bodyFont === "EB Garamond" ? "var(--font-serif)" : bodyFont === "Cormorant Garamond" ? "var(--font-cormorant)" : bodyFont === "Merriweather" ? "var(--font-merriweather)" : "var(--font-sans)",
          }}
        >
          {/* Elegant Watercolor Background Blobs */}
          {showDecorations && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50 transition-opacity">
              {/* Top Right Pink Blob */}
              <div 
                className="absolute -top-16 -right-16 w-64 h-64 rounded-full blur-3xl mix-blend-multiply opacity-70"
                style={{ backgroundColor: "rgba(255, 202, 212, 0.5)" }}
              />
              {/* Bottom Left Mint Blob */}
              <div 
                className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full blur-3xl mix-blend-multiply opacity-60"
                style={{ backgroundColor: "rgba(232, 240, 226, 0.6)" }}
              />
              {/* Center Lavender Glow */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-3xl mix-blend-screen opacity-40"
                style={{ backgroundColor: "rgba(240, 230, 247, 0.4)" }}
              />
              {/* Decorative Subtle Grid or Dots representing paper texture */}
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(${text} 1px, transparent 0)`, backgroundSize: "24px 24px" }} />
            </div>
          )}

          {/* Aesthetic Elegant Header Border */}
          <div className="w-12 h-0.5 mb-8 opacity-40 rounded-full" style={{ backgroundColor: accent }} />

          {/* Card Content Wrapper */}
          <div className="w-full max-w-xl z-10 flex-grow flex flex-col justify-center">
            {/* Title */}
            <h1
              className="mb-8 font-semibold tracking-wide text-center leading-tight break-words"
              style={{
                color: text,
                fontFamily: displayFont === "Cinzel" ? "var(--font-cinzel)" : displayFont === "Dancing Script" ? "var(--font-dancing)" : displayFont === "Playfair Display" ? "var(--font-display)" : displayFont === "EB Garamond" ? "var(--font-serif)" : displayFont === "Montserrat" ? "var(--font-montserrat)" : "var(--font-display)",
                fontSize: "2rem",
                textShadow: "0 1px 2px rgba(0,0,0,0.03)",
              }}
            >
              {titleText}
            </h1>

            {/* Refined Main Text content */}
            <div
              className={`whitespace-pre-wrap ${getFontSizeClass()} ${getAlignmentClass()}`}
              style={{
                textShadow: "0 1px 1px rgba(255,255,255,0.4)",
              }}
            >
              {creation.refinedContent}
            </div>
          </div>

          {/* Card Footer Decor */}
          <div className="w-full max-w-xl mt-12 z-10 flex flex-col items-center">
            <div className="w-8 h-px mb-3 opacity-30" style={{ backgroundColor: text }} />
            
            {/* Muse visual elements suggestion or metadata */}
            <div className="text-[11px] uppercase tracking-[0.25em] opacity-45 flex items-center gap-1.5 font-mono">
              <Sparkles className="w-2.5 h-2.5" />
              NÀNG THƠ KỸ THUẬT SỐ
            </div>
            
            {creation.artisticSuggestion?.visualElement && (
              <p className="text-[10px] italic mt-1.5 opacity-40 text-center font-sans max-w-xs">
                Minh họa ý tưởng: {creation.artisticSuggestion.visualElement}
              </p>
            )}
          </div>
        </div>

        {/* Float Controls for Download / Action */}
        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <button
            onClick={handleCopyText}
            className="flex items-center gap-1.5 bg-stone-900/90 text-white backdrop-blur-xs px-3 py-1.5 rounded-full text-xs hover:bg-stone-800 active:scale-95 transition-all shadow-md cursor-pointer"
            title="Sao chép lời thơ/văn đã tinh chỉnh"
          >
            {copiedText ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                Đã sao chép chữ
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                Sao chép chữ
              </>
            )}
          </button>

          <button
            onClick={handleCopyImage}
            disabled={copyingImage}
            className="flex items-center gap-1.5 bg-stone-900/90 text-white backdrop-blur-xs px-3 py-1.5 rounded-full text-xs hover:bg-stone-800 active:scale-95 transition-all shadow-md cursor-pointer"
            title="Sao chép ảnh thẻ thư họa vào bộ nhớ tạm"
          >
            {copyingImage ? (
              <>
                <RefreshCw className="w-3 h-3 animate-spin" />
                Đang chụp thẻ...
              </>
            ) : copiedImage ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                Đã sao chép ảnh
              </>
            ) : (
              <>
                <Image className="w-3 h-3" />
                Sao chép ảnh
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex items-center gap-1.5 bg-stone-900/90 text-white backdrop-blur-xs px-3 py-1.5 rounded-full text-xs hover:bg-stone-800 active:scale-95 transition-all shadow-md cursor-pointer"
            title="Tải ảnh thẻ thư họa về máy"
          >
            {downloading ? (
              <>
                <RefreshCw className="w-3 h-3 animate-spin" />
                Đang vẽ ảnh...
              </>
            ) : (
              <>
                <Download className="w-3 h-3" />
                Lưu Thư Họa
              </>
            )}
          </button>
        </div>
      </div>

      {/* Aesthetic suggestions details print */}
      <div className="p-4 bg-amber-50/40 border border-amber-200/50 rounded-xl">
        <h4 className="text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Ý Tưởng Thiết Kế của Nàng Thơ
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-stone-600 leading-relaxed">
          <p>
            <strong className="text-stone-800">Bố cục đề xuất:</strong> {creation.artisticSuggestion?.layout || "Bố cục cân bằng với lề rộng lãng mạn."}
          </p>
          <p>
            <strong className="text-stone-800">Ý tưởng minh họa:</strong> {creation.artisticSuggestion?.visualElement || "Một nhánh dương xỉ khô tinh khôi kẹp giữa trang vở."}
          </p>
          <p>
            <strong className="text-stone-800">Bảng màu đề xuất:</strong> <span className="underline font-semibold" style={{ color: accent }}>{creation.artisticSuggestion?.colorPalette?.name || "Nguyên bản tinh giản"}</span> (Nền: {creation.artisticSuggestion?.colorPalette?.bg}, Chữ: {creation.artisticSuggestion?.colorPalette?.text})
          </p>
          <p>
            <strong className="text-stone-800">Kiểu chữ khuyên dùng:</strong> Tiêu đề là <span className="font-semibold">{displayFont}</span>, nội dung dùng <span className="font-semibold">{bodyFont}</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
