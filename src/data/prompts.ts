import { CreativeSpace, TopicPrompt } from "../types";

export const SPACE_LABELS: Record<CreativeSpace, { title: string; subtitle: string; icon: string; description: string }> = {
  diary: {
    title: "Nhật ký tâm tình",
    subtitle: "Diary",
    icon: "HeartHandshake",
    description: "Nơi lắng nghe, gọi tên những cảm xúc tinh tế ẩn sâu trong tâm hồn, giúp xoa dịu và lưu giữ từng rung động thường nhật.",
  },
  prose: {
    title: "Tản văn chiêm nghiệm",
    subtitle: "Prose",
    icon: "BookOpen",
    description: "Nơi những dòng suy ngẫm triết học hòa vào chất thơ, kết nối những khoảnh khắc giản dị với giá trị nhân sinh sâu sắc.",
  },
  creative: {
    title: "Sáng tác văn nghệ",
    subtitle: "Creative Writing",
    icon: "Sparkles",
    description: "Nơi định hình cốt truyện, tạc nên nhân vật cho truyện ngắn hay dệt vần điệu, hình ảnh tinh khôi cho thi ca.",
  },
  criticism: {
    title: "Phê bình văn học",
    subtitle: "Literary Criticism",
    icon: "Compass",
    description: "Nơi phân tích sâu sắc dưới góc nhìn đa chiều, mổ xẻ kỹ thuật viết, tính nghệ thuật và thông điệp triết mỹ của tác phẩm.",
  },
};

export const TOPIC_PROMPTS: Record<CreativeSpace, TopicPrompt[]> = {
  diary: [
    {
      id: "diary_1",
      title: "Mưa rơi ngoài cửa sổ",
      description: "Lắng nghe tiếng mưa rả rích, viết về những mảnh ký ức xưa cũ trỗi dậy hay cảm xúc bình yên nhè nhẹ khi trốn mình trong căn phòng ấm.",
      hint: "Hãy tập trung miêu tả âm thanh của mưa, mùi đất ẩm, và màu xám dịu của bầu trời để gọi tên cảm xúc hiện tại.",
    },
    {
      id: "diary_2",
      title: "Lời chưa kịp ngỏ",
      description: "Gửi gắm cho một người thương, một người bạn cũ hay chính bản thân bạn ở quá khứ những tâm sự thầm kín chưa bao giờ dám nói thành lời.",
      hint: "Bắt đầu bằng một cái tên hư cấu hoặc xưng hô ấm áp, viết như một lá thư tay gửi đi nhưng giữ lại cho riêng mình.",
    },
    {
      id: "diary_3",
      title: "Một ngày đi lạc giữa thành phố",
      description: "Viết về cảm giác nhỏ bé khi bước đi thong dong giữa dòng người hối hả, một quán cà phê quen hay một góc phố rợp bóng hoàng hôn.",
      hint: "Ghi lại những chi tiết thị giác nhỏ: một ánh mắt lướt qua, vạt nắng cuối ngày chiếu xiên qua kẽ lá, nhịp tim chậm lại giữa phố phường.",
    },
  ],
  prose: [
    {
      id: "prose_1",
      title: "Triết lý tách cà phê nguội",
      description: "Chiêm nghiệm về thời gian trôi và sự lãng quên thông qua hình ảnh một tách cà phê dần nguội lạnh trên chiếc bàn gỗ quen thuộc.",
      hint: "Kết nối vị đắng, hơi ấm tan dần của cà phê với những cơ hội đã lỡ hoặc một mối quan hệ đang nhạt phai theo năm tháng.",
    },
    {
      id: "prose_2",
      title: "Mùa hoa đi ngang phố",
      description: "Suy ngẫm về sự tuần hoàn của cuộc đời và vẻ đẹp mong manh của vạn vật khi ngắm nhìn những gánh hoa dạo thay áo theo mùa.",
      hint: "Sử dụng những hình ảnh so sánh độc đáo giữa nhịp sinh trưởng của hoa và nhịp sống bên trong tâm thức con người.",
    },
    {
      id: "prose_3",
      title: "Sự im lặng đắt giá",
      description: "Tại sao đôi khi sự im lặng lại mang nhiều sức nặng hơn ngàn lời nói? Chiêm nghiệm về khoảng trống giữa các cuộc đối thoại.",
      hint: "Nhìn nhận sự im lặng không như một sự trốn tránh, mà như một khoảng lặng nghệ thuật, một nốt nghỉ trong bản nhạc cuộc đời.",
    },
  ],
  creative: [
    {
      id: "creative_1",
      title: "Cửa hàng bán những giấc mơ cũ (Truyện ngắn)",
      description: "Xây dựng bối cảnh một cửa tiệm nhỏ ẩn sâu trong con hẻm, nơi người ta có thể mua lại những giấc mơ thời thơ ấu đã bị lãng quên.",
      hint: "Tập trung tả ông chủ tiệm bí ẩn, các lọ thủy tinh chứa giấc mơ lấp lánh sắc màu và giao dịch đặc biệt (đổi giấc mơ lấy một phần ký ức).",
    },
    {
      id: "creative_2",
      title: "Khói hoàng hôn (Thơ)",
      description: "Dệt những vần thơ dịu nhẹ về buổi chiều tà ở một vùng quê thanh bình hoặc trên những mái nhà tranh, khói bếp quyện sương mờ.",
      hint: "Thử viết theo thể thơ tự do hoặc 5 chữ, sử dụng vần chân mượt mà và các ẩn dụ về sự đoàn tụ, gia đình.",
    },
    {
      id: "creative_3",
      title: "Người nhặt bóng trăng (Truyện ngắn / Thơ)",
      description: "Kể câu chuyện về một nhân vật kỳ lạ hằng đêm chèo thuyền ra lòng hồ để nhặt những mảnh trăng vỡ tan rơi trên sóng nước.",
      hint: "Mang màu sắc huyền ảo cổ tích. Có thể lồng ghép thông điệp về việc gìn giữ những giá trị lý tưởng, lãng mạn giữa thế giới thực tại.",
    },
  ],
  criticism: [
    {
      id: "criticism_1",
      title: "Tính nhạc trong thi ca",
      description: "Phân tích cách tác giả sử dụng các thanh điệu (bằng - trắc), phép điệp từ và nhịp điệu để biến bài thơ thành một bản nhạc không lời.",
      hint: "Chọn một đoạn thơ tiêu biểu bạn thích, phân tích kỹ thuật gieo vần, cách ngắt nhịp làm biến chuyển nhịp thở của người đọc.",
    },
    {
      id: "criticism_2",
      title: "Hình tượng 'Cánh buồm' và sự viễn du",
      description: "Mổ xẻ ý nghĩa biểu tượng của cánh buồm trong văn chương cổ và hiện đại: khao khát tự do hay sự cô độc trước đại dương mênh mông.",
      hint: "Liên hệ giữa hình ảnh vật chất (cánh buồm đón gió) với khát vọng tinh thần (vượt thoát ranh giới cũ của cái tôi cá nhân).",
    },
    {
      id: "criticism_3",
      title: "Nghệ thuật xây dựng tâm lý nhân vật",
      description: "Phân tích cách các nhà văn hiện thực khắc họa thế giới nội tâm giằng xé của nhân vật thông qua độc thoại nội tâm và chi tiết ngoại cảnh.",
      hint: "Xem xét sự tác động của hoàn cảnh xã hội lên dòng suy nghĩ thầm kín và những quyết định mang tính bước ngoặt của nhân vật.",
    },
  ],
};

export const PASTEL_BACKGROUNDS = [
  { name: "Kem Ấm", value: "#FAEDCD", text: "#2D2526", accent: "#D4A373" },
  { name: "Hồng Tro", value: "#FFCAD4", text: "#3D2B3D", accent: "#E07A5F" },
  { name: "Xanh Mint Nhạt", value: "#E8F0E2", text: "#1E352F", accent: "#81B29A" },
  { name: "Tím Oải Hương", value: "#F0E6F7", text: "#2E1A47", accent: "#9D4EDD" },
  { name: "Xanh Dịu", value: "#E2EDF8", text: "#1C2D42", accent: "#3F8EFC" },
  { name: "Vàng Nắng Nhạt", value: "#FEFAE0", text: "#283618", accent: "#D4A373" },
  { name: "Trắng Ngà", value: "#FDFBF7", text: "#2A2421", accent: "#8A5A44" },
];

export const FONT_PAIRINGS = [
  { name: "Cổ Điển Ý Lực", displayFont: "Cinzel", bodyFont: "EB Garamond" },
  { name: "Thơ Mộng Pháp", displayFont: "Dancing Script", bodyFont: "Cormorant Garamond" },
  { name: "Sang Trọng Hiện Đại", displayFont: "Playfair Display", bodyFont: "Inter" },
  { name: "Thanh Lịch Tri Thức", displayFont: "EB Garamond", bodyFont: "Merriweather" },
  { name: "Tối Giản Độc Đáo", displayFont: "Montserrat", bodyFont: "Inter" },
];
