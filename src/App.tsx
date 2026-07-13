import React, { useState, useEffect } from "react";
import { CreativeSpace, MuseResponse, SavedCreation, TopicPrompt } from "./types";
import { SPACE_LABELS } from "./data/prompts";
import MuseConsole from "./components/MuseConsole";
import VisualCanvas from "./components/VisualCanvas";
import PromptSuggestions from "./components/PromptSuggestions";
import CreationHistory from "./components/CreationHistory";
import { HeartHandshake, BookOpen, Sparkles, Compass, Feather, Archive, FileText, Info } from "lucide-react";

// Pre-loaded stunning demo creations to prevent blank cold-start
const INITIAL_DEMOS: Record<CreativeSpace, SavedCreation> = {
  diary: {
    id: "demo_diary",
    title: "Lời Tự Tình Gửi Hoàng Hôn",
    space: "diary",
    subType: "",
    rawContent: "Hôm nay đi làm về thấy hoàng hôn đẹp quá nhưng cũng tự dưng thấy hơi cô đơn dã man...",
    inspirationSpark: "Nàng Thơ cảm nhận được một vạt buồn thầm kín ẩn hiện sau vạt nắng rực rỡ, một nhịp đập tâm hồn vô cùng mộc mạc và sâu sắc.",
    refinedContent: "Hôm nay, hoàng hôn rơi chậm trên ô kính nhỏ.\nCó những ngày lòng trĩu nhẹ một vạt sương,\nta chỉ muốn ngồi yên, nghe gió kể chuyện,\nvà gọi tên từng nỗi nhớ không đầu không cuối...\n\nSự dịu dàng của buổi chiều muộn dường như\nđang khẽ ôm lấy chút mệt nhoài sau một ngày dài.",
    artisticSuggestion: {
      layout: "Căn giữa mềm mại, biên độ thơ thưa, rải nhịp rộng lãng mạn.",
      colorPalette: {
        name: "Hoàng Hôn Hồng Tro",
        bg: "#FFCAD4",
        text: "#3D2B3D",
        accent: "#E07A5F",
      },
      visualElement: "Một đóa tường vi khô nhạt ép phẳng phiu.",
      fontPairing: {
        displayFont: "Dancing Script",
        bodyFont: "Cormorant Garamond",
      },
    },
    closingThought: "Hãy để những mệt mỏi tan vào bóng tối dịu dàng đang buông xuống bạn nhé.",
    questions: [
      "Vạt hoàng hôn rực rỡ hôm nay có khơi gợi lại lời hẹn ước hay một gương mặt quen thuộc nào trong ký ức của bạn không?",
      "Nếu nỗi cô đơn này là một nốt lặng trong bản nhạc, bạn muốn nốt tiếp theo sẽ mang giai điệu ấm áp thế nào?",
    ],
    createdAt: new Date().toISOString(),
  },
  prose: {
    id: "demo_prose",
    title: "Vị Đắng Của Thời Gian",
    space: "prose",
    subType: "",
    rawContent: "Ngồi uống cà phê thấy tách cà phê nguội ngắt rồi tự dưng nghĩ về thời gian trôi đi nhanh quá chả chờ đợi ai bao giờ.",
    inspirationSpark: "Hình ảnh tách cà phê nguội lạnh của bạn khơi gợi những chiêm nghiệm vô cùng đắt giá về sự dịch chuyển vô ảnh của thời gian và tình người.",
    refinedContent: "Tách cà phê bị lãng quên trên chiếc bàn gỗ thẫm màu, hơi ấm cứ thế tan loãng vào hư vô. \n\nThời gian cũng hệt như dòng nước sẫm vị đắng ấy, không bao giờ dừng lại để chờ đợi những do dự của lòng người. \nChúng ta cứ mải miết đuổi theo những ngày mai, để rồi chợt nhận ra nhiều điều quý giá đã hóa lạnh ngắt từ lúc nào.",
    artisticSuggestion: {
      layout: "Căn lề rộng hai bên (Justify), chia đoạn thưa thoáng bộc lộ khoảng trống chiêm nghiệm.",
      colorPalette: {
        name: "Trắng Ngà Kem Ấm",
        bg: "#FEFAE0",
        text: "#283618",
        accent: "#D4A373",
      },
      visualElement: "Vệt loang cà phê khô nhạt mộc mạc trên giấy sợi tự nhiên.",
      fontPairing: {
        displayFont: "Playfair Display",
        bodyFont: "EB Garamond",
      },
    },
    closingThought: "Nhận ra sự lạnh đi của thời gian chính là bước đầu để ta trân trọng từng hơi ấm đang ôm giữ hôm nay.",
    questions: [
      "Có bao giờ bạn nuối tiếc vì đã để một hơi ấm nào đó nguội lạnh trước khi kịp nhận ra giá trị của nó?",
    ],
    createdAt: new Date().toISOString(),
  },
  creative: {
    id: "demo_creative",
    title: "Kẻ Nhặt Trăng Đầu Non",
    space: "creative",
    subType: "Thơ",
    rawContent: "Viết thơ về một người cứ đêm xuống lại đi nhặt trăng vỡ trên mặt hồ.",
    inspirationSpark: "Một ý niệm vô cùng huyền ảo và đậm tính tráng lệ cổ điển. Hình ảnh nhặt trăng gợi lên khát vọng giữ gìn cái đẹp lý tưởng.",
    refinedContent: "Đêm chèo thuyền mỏng vượt ngàn khơi\nNhặt vạt trăng tan rớt giữa trời\nSóng vỡ trăm miền lòng thạch thảo\nTrăng tàn mấy dải lệ bồng trôi.\n\nNgười đem dệt lại tơ vàng úa\nỦ chút hương trầm gửi gió khơi.",
    artisticSuggestion: {
      layout: "Căn lề giữa trang trọng cổ điển, khoảng cách dòng trung bình tạo sự trang nghiêm, tao nhã.",
      colorPalette: {
        name: "Tím Oải Hương Sương",
        bg: "#F0E6F7",
        text: "#2E1A47",
        accent: "#9D4EDD",
      },
      visualElement: "Hình ảnh vầng trăng khuyết lồng nhẹ vào sóng nước màu nước.",
      fontPairing: {
        displayFont: "Cinzel",
        bodyFont: "EB Garamond",
      },
    },
    closingThought: "Sứ mệnh nhặt nhạnh cái đẹp mong manh luôn là sứ mệnh đơn độc nhưng kiêu hãnh của người nghệ sĩ.",
    questions: [
      "Tại sao vầng trăng trên mặt hồ lại bị vỡ? Nó đại diện cho niềm tin hay lý tưởng nào đã bị rạn vỡ trong thế giới hiện thực?",
    ],
    createdAt: new Date().toISOString(),
  },
  criticism: {
    id: "demo_criticism",
    title: "Tiếng Nhạc Đi Trong Thơ Xuân Diệu",
    space: "criticism",
    subType: "",
    rawContent: "Thơ xuân diệu nghe rất giàu tính nhạc, âm điệu bằng trắc nghe cứ du dương như hát vậy.",
    inspirationSpark: "Một góc nhìn tinh nhạy đặt nền tảng vào sự giao hòa tuyệt mỹ giữa âm nhạc và thi ca trong thơ mới Việt Nam.",
    refinedContent: "Trong địa hạt thi ca của Xuân Diệu, ngôn từ không chỉ mang sứ mệnh biểu đạt ngữ nghĩa, mà còn tự thân ngân rung như những phím tơ đồng.\n\nSự luân chuyển uyển chuyển giữa các thanh bằng trắc kết hợp với nghệ thuật điệp vần liên tiếp tạo ra một dòng chảy âm thanh cuộn trào, đồng nhịp với những rạo rực thầm kín của một trái tim yêu cuồng nhiệt.\nĐọc thơ ông, ta cảm giác như đang lắng nghe một bản concerto lộng lẫy về tình yêu và tuổi trẻ.",
    artisticSuggestion: {
      layout: "Bố cục học thuật, căn trái sang trọng, lề phải rộng rãi tao nhã.",
      colorPalette: {
        name: "Xanh Mint Học Thuật",
        bg: "#E8F0E2",
        text: "#1E352F",
        accent: "#81B29A",
      },
      visualElement: "Biểu tượng chiếc đàn Lia (Lyre) phác thảo bằng nét bút mực thanh mảnh.",
      fontPairing: {
        displayFont: "Playfair Display",
        bodyFont: "Inter",
      },
    },
    closingThought: "Hiểu được nhạc tính là chìa khóa mở cánh cửa vào thế giới cảm xúc nồng nàn nhất của thơ Xuân Diệu.",
    questions: [
      "Bên cạnh thanh điệu, các biện pháp tu từ như điệp âm hay vắt dòng đóng vai trò gì trong việc kiến tạo nhạc tính này?",
    ],
    createdAt: new Date().toISOString(),
  },
};

export default function App() {
  const [activeSpace, setActiveSpace] = useState<CreativeSpace>("diary");
  const [subType, setSubType] = useState<string>("Thơ");
  const [rawContent, setRawContent] = useState<string>("");
  const [promptHint, setPromptHint] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Loaded response from Muse
  const [currentResponse, setCurrentResponse] = useState<MuseResponse | null>(null);
  const [savedCreations, setSavedCreations] = useState<SavedCreation[]>([]);
  const [activeCreationId, setActiveCreationId] = useState<string | undefined>(undefined);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // Initialize and load saved creations from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("artistic_muse_creations");
      if (stored) {
        setSavedCreations(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load saved creations:", e);
    }
    
    // Load initial demo for the default space
    loadDemo(activeSpace);
  }, []);

  const loadDemo = (space: CreativeSpace) => {
    const demo = INITIAL_DEMOS[space];
    setRawContent(demo.rawContent);
    setPromptHint("");
    setCurrentResponse({
      inspirationSpark: demo.inspirationSpark,
      refinedContent: demo.refinedContent,
      artisticSuggestion: demo.artisticSuggestion,
      closingThought: demo.closingThought,
      questions: demo.questions,
    });
    setActiveCreationId(demo.id);
    setIsSaved(true);
    setError(null);
  };

  const handleSpaceChange = (space: CreativeSpace) => {
    setActiveSpace(space);
    loadDemo(space);
  };

  const handleSelectPrompt = (prompt: TopicPrompt) => {
    setRawContent(prompt.description);
    setPromptHint(prompt.hint);
    setActiveCreationId(undefined);
    setIsSaved(false);
  };

  const handleSelectDirective = (directive: string) => {
    const nextHint = promptHint ? `${promptHint}, ${directive.toLowerCase()}` : directive;
    setPromptHint(nextHint);
  };

  const handleGenerate = async () => {
    if (!rawContent.trim()) return;
    setLoading(true);
    setError(null);
    setIsSaved(false);
    setActiveCreationId(undefined);

    try {
      const res = await fetch("/api/muse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: rawContent,
          space: activeSpace,
          subType: activeSpace === "creative" ? subType : undefined,
          promptHint: promptHint || undefined,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Giao tiếp với Nàng Thơ bị gián đoạn.");
      }

      const data: MuseResponse = await res.json();
      setCurrentResponse(data);
    } catch (err: any) {
      console.error("Generation error:", err);
      setError(err.message || "Đã xảy ra lỗi không xác định.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCreation = () => {
    if (!currentResponse) return;
    
    const newCreation: SavedCreation = {
      id: `creation_${Date.now()}`,
      title: currentResponse.refinedContent.split("\n")[0]?.substring(0, 30) || "Tác phẩm mới",
      space: activeSpace,
      subType: activeSpace === "creative" ? subType : "",
      rawContent,
      inspirationSpark: currentResponse.inspirationSpark,
      refinedContent: currentResponse.refinedContent,
      artisticSuggestion: currentResponse.artisticSuggestion,
      closingThought: currentResponse.closingThought,
      questions: currentResponse.questions,
      createdAt: new Date().toISOString(),
    };

    const nextCreations = [newCreation, ...savedCreations];
    setSavedCreations(nextCreations);
    localStorage.setItem("artistic_muse_creations", JSON.stringify(nextCreations));
    setActiveCreationId(newCreation.id);
    setIsSaved(true);
  };

  const handleDeleteCreation = (id: string) => {
    const nextCreations = savedCreations.filter((c) => c.id !== id);
    setSavedCreations(nextCreations);
    localStorage.setItem("artistic_muse_creations", JSON.stringify(nextCreations));
    
    if (activeCreationId === id) {
      setActiveCreationId(undefined);
      setIsSaved(false);
    }
  };

  const handleSelectCreation = (creation: SavedCreation) => {
    setActiveSpace(creation.space);
    if (creation.space === "creative" && creation.subType) {
      setSubType(creation.subType);
    }
    setRawContent(creation.rawContent);
    setPromptHint("");
    setCurrentResponse({
      inspirationSpark: creation.inspirationSpark,
      refinedContent: creation.refinedContent,
      artisticSuggestion: creation.artisticSuggestion,
      closingThought: creation.closingThought,
      questions: creation.questions,
    });
    setActiveCreationId(creation.id);
    setIsSaved(true);
  };

  const handleUpdateCustomization = (customizations: any) => {
    if (!currentResponse) return;
    
    const updatedResponse = {
      ...currentResponse,
      title: customizations.title !== undefined ? customizations.title : currentResponse.refinedContent.split("\n")[0],
      customBg: customizations.customBg || currentResponse.customBg,
      customText: customizations.customText || currentResponse.customText,
      customAccent: customizations.customAccent || currentResponse.customAccent,
      customDisplayFont: customizations.customDisplayFont || currentResponse.customDisplayFont,
      customBodyFont: customizations.customBodyFont || currentResponse.customBodyFont,
      customFontSize: customizations.customFontSize || currentResponse.customFontSize,
      customAlignment: customizations.customAlignment || currentResponse.customAlignment,
    };
    
    setCurrentResponse(updatedResponse as any);

    // If it's already a saved creation in the history, update it in localStorage
    if (activeCreationId && !activeCreationId.startsWith("demo_")) {
      const updatedCreations = savedCreations.map((c) => {
        if (c.id === activeCreationId) {
          return {
            ...c,
            title: customizations.title !== undefined ? customizations.title : c.title,
            customBg: customizations.customBg || c.customBg,
            customText: customizations.customText || c.customText,
            customAccent: customizations.customAccent || c.customAccent,
            customDisplayFont: customizations.customDisplayFont || c.customDisplayFont,
            customBodyFont: customizations.customBodyFont || c.customBodyFont,
            customFontSize: customizations.customFontSize || c.customFontSize,
            customAlignment: customizations.customAlignment || c.customAlignment,
          };
        }
        return c;
      });
      setSavedCreations(updatedCreations);
      localStorage.setItem("artistic_muse_creations", JSON.stringify(updatedCreations));
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D2526] flex flex-col font-sans transition-colors duration-300">
      
      {/* Dynamic Poetic Nav / Header */}
      <header className="border-b border-stone-200/50 bg-[#FDFBF7]/80 backdrop-blur-md sticky top-0 z-30 px-4 py-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 to-rose-400 flex items-center justify-center text-white shadow-md">
              <Feather className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-serif text-lg md:text-xl font-bold tracking-wide text-stone-800 flex items-center gap-2">
                Nàng Thơ Kỹ Thuật Số
                <span className="hidden md:inline-block text-[10px] uppercase font-mono tracking-widest bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full font-normal">
                  Artistic Muse
                </span>
              </h1>
              <p className="text-[10.5px] text-stone-500 font-medium">Người đồng hành sáng tạo nội dung đa phương tiện chiêm nghiệm</p>
            </div>
          </div>

          {/* Functional Spaces Ribbon Switcher */}
          <nav className="flex bg-stone-100 p-1 rounded-xl border border-stone-200 shadow-sm max-w-full overflow-x-auto">
            {(["diary", "prose", "creative", "criticism"] as const).map((space) => {
              const active = activeSpace === space;
              return (
                <button
                  key={space}
                  onClick={() => handleSpaceChange(space)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                    active
                      ? "bg-white text-stone-800 shadow-xs"
                      : "text-stone-500 hover:text-stone-800"
                  }`}
                >
                  {space === "diary" && <HeartHandshake className="w-3.5 h-3.5 text-rose-500/80" />}
                  {space === "prose" && <BookOpen className="w-3.5 h-3.5 text-sky-500/80" />}
                  {space === "creative" && <Sparkles className="w-3.5 h-3.5 text-amber-500/80" />}
                  {space === "criticism" && <Compass className="w-3.5 h-3.5 text-indigo-500/80" />}
                  {SPACE_LABELS[space].title.split(" ")[0]}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Workspace Frame */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 py-8 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: Writer Workbench (Muse Console) - col-span-5 */}
        <div className="lg:col-span-5 space-y-6">
          <MuseConsole
            space={activeSpace}
            subType={subType}
            setSubType={setSubType}
            rawContent={rawContent}
            setRawContent={setRawContent}
            promptHint={promptHint}
            setPromptHint={setPromptHint}
            loading={loading}
            onGenerate={handleGenerate}
            response={currentResponse}
            onSaveCreation={handleSaveCreation}
            isSaved={isSaved}
            error={error}
          />
        </div>

        {/* Right column: Graphic Exhibition (Visual Canvas & History) - col-span-7 */}
        <div className="lg:col-span-7 space-y-8">
          {currentResponse ? (
            <VisualCanvas
              creation={{
                title: currentResponse.title || activeCreationId ? savedCreations.find(c => c.id === activeCreationId)?.title : undefined,
                refinedContent: currentResponse.refinedContent,
                artisticSuggestion: currentResponse.artisticSuggestion,
                customBg: currentResponse.customBg,
                customText: currentResponse.customText,
                customAccent: currentResponse.customAccent,
                customDisplayFont: currentResponse.customDisplayFont,
                customBodyFont: currentResponse.customBodyFont,
                customFontSize: currentResponse.customFontSize,
                customAlignment: currentResponse.customAlignment,
              } as any}
              onUpdateCustomization={handleUpdateCustomization}
            />
          ) : (
            <div className="p-12 text-center border-2 border-dashed border-stone-200 rounded-3xl bg-stone-50/30 flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-4 animate-pulse">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-700">Chờ đợi ngọn lửa thi ca</h3>
              <p className="text-xs text-stone-500 max-w-sm mt-2 leading-relaxed">
                Khi bạn nhập bản thảo và gởi thỉnh cầu, Nàng Thơ sẽ bắt đầu phân tích nghệ thuật, dệt chữ và kiến tạo một bức tranh họa thơ tuyệt mỹ ở đây.
              </p>
            </div>
          )}

          {/* Extra utility row: Prompts & History bento block */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-200/50">
            {/* Writing Assistant Prompts */}
            <div className="bg-white border border-stone-100 p-5 rounded-2xl shadow-xs">
              <PromptSuggestions
                space={activeSpace}
                onSelectPrompt={handleSelectPrompt}
                onSelectDirective={handleSelectDirective}
              />
            </div>

            {/* Collection Catalog History */}
            <div className="bg-white border border-stone-100 p-5 rounded-2xl shadow-xs">
              <CreationHistory
                creations={savedCreations}
                onSelectCreation={handleSelectCreation}
                onDeleteCreation={handleDeleteCreation}
                activeId={activeCreationId}
              />
            </div>
          </div>
        </div>

      </main>

      {/* Footer Details */}
      <footer className="border-t border-stone-200/40 bg-stone-50/50 py-8 px-4 mt-12 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-serif font-medium">© 2026 Nàng Thơ Kỹ Thuật Số. Nơi con chữ chạm vào rung cảm của tâm hồn.</p>
          <div className="flex gap-4 items-center font-mono text-[10px] text-stone-400">
            <span className="flex items-center gap-1">
              <Info className="w-3.5 h-3.5" />
              Chạy với Gemini 3.5 Flash
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
