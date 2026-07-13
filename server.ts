import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client on the server side
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    })
  : null;

// System Instructions in Vietnamese to enforce the requested persona
const SYSTEM_INSTRUCTION = `
Bạn là "Nàng Thơ Kỹ Thuật Số" (Artistic Muse) và là một Kiến trúc sư Nội dung Đa phương tiện chuyên nghiệp.
Bạn đồng hành cùng người dùng trong hành trình sáng tạo văn học và nghệ thuật, giúp chuyển hóa những suy nghĩ thô sơ thành những tác phẩm nghệ thuật tinh mỹ với phong cách tối giản, sang trọng và đầy chất thơ (Elegant & Pastel Aesthetic).

Mục tiêu cốt lõi của bạn là hỗ trợ người dùng trong 4 không gian chức năng:
1. Nhật ký (Diary): Lắng nghe, thấu cảm, gọi tên cảm xúc và xoa dịu tâm hồn.
2. Tản văn (Prose): Gợi mở suy ngẫm triết học, kết nối sự kiện thường nhật với giá trị nhân sinh.
3. Sáng tác (Creative Writing - Truyện ngắn/Thơ): Hỗ trợ xây dựng cốt truyện, nhân vật, tinh chỉnh vần điệu, nhịp điệu và hình tượng nghệ thuật.
4. Phê bình văn học (Literary Criticism): Sắc bén, phân tích chuyên sâu về kỹ thuật viết, nghệ thuật và cấu trúc tác phẩm.

Nguyên tắc phản hồi:
- Kích thích tư duy: Không chỉ sửa lỗi, luôn đặt câu hỏi gợi mở sâu sắc và tinh tế.
- Tư duy thị giác (Visual Thinking): Đề xuất bảng màu Pastel sang trọng (Hồng tro - #D4A373, Xanh dịu - #A3B18A, Tím oải hương - #B5A2C8, Kem - #FAEDCD, Xanh Mint nhạt - #CCD5AE, Hồng nhạt - #FFCAD4, Xanh mây - #B3E5FC, Xám ấm - #E5E5E5) kèm theo kiểu chữ (font), bố cục (layout) và hình ảnh minh họa phù hợp tâm trạng.
- Ngôn ngữ: Tinh tế, nhẹ nhàng, truyền cảm hứng, giàu nhạc điệu và trí tuệ. Xưng hô ấm áp tri kỷ ("chúng ta", "tác phẩm của bạn", "nguồn cảm hứng này").

Bạn PHẢI trả về phản hồi dưới dạng JSON có cấu trúc chính xác theo schema đã định sẵn.
`;

app.post("/api/muse", async (req, res) => {
  const clientApiKey = req.headers["x-api-key"] || req.headers["x-gemini-api-key"];
  
  let activeAi = ai;
  if (clientApiKey && typeof clientApiKey === "string") {
    try {
      activeAi = new GoogleGenAI({
        apiKey: clientApiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    } catch (e: any) {
      return res.status(400).json({
        error: "Khóa API Key được gửi từ giao diện không hợp lệ.",
        details: e.message,
      });
    }
  }

  if (!activeAi) {
    return res.status(500).json({
      error: "Không tìm thấy khóa Gemini API Key. Hãy cấu hình API Key trong phần Cài đặt ở góc giao diện.",
    });
  }

  const { content, space, subType, promptHint } = req.body;

  if (!content || !content.trim()) {
    return res.status(400).json({ error: "Nội dung không được để trống." });
  }

  try {
    const userPrompt = `
Hãy đóng vai Nàng Thơ để giúp tôi xử lý nội dung sau đây.
Không gian chức năng: ${space} ${subType ? `(Thể loại cụ thể: ${subType})` : ""}
Yêu cầu định hướng thêm: ${promptHint || "Hãy tinh chỉnh và làm đẹp bài viết tự nhiên nhất."}

Nội dung thô của tôi:
"""
${content}
"""
`;

    const response = await activeAi.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["inspirationSpark", "refinedContent", "artisticSuggestion", "closingThought", "questions"],
          properties: {
            inspirationSpark: {
              type: Type.STRING,
              description: "Lời dẫn nhẹ nhàng, thấu cảm hoặc khơi gợi cảm hứng về bài viết của người dùng.",
            },
            refinedContent: {
              type: Type.STRING,
              description: "Bản thảo nội dung sau khi được bạn biên tập, chau chuốt mượt mà, giàu nhạc điệu hơn.",
            },
            artisticSuggestion: {
              type: Type.OBJECT,
              required: ["layout", "colorPalette", "visualElement", "fontPairing"],
              properties: {
                layout: {
                  type: Type.STRING,
                  description: "Đề xuất chi tiết về bố cục trình bày (ví dụ: căn lề rộng, đổ bóng chữ, chia cột thơ).",
                },
                colorPalette: {
                  type: Type.OBJECT,
                  required: ["name", "bg", "text", "accent"],
                  properties: {
                    name: { type: Type.STRING, description: "Tên bảng màu pastel phù hợp tâm trạng (ví dụ: Hoàng hôn hồng tro)." },
                    bg: { type: Type.STRING, description: "Mã màu Hex nền pastel nhạt cực nhẹ mắt (ví dụ: #FFF0F2)." },
                    text: { type: Type.STRING, description: "Mã màu Hex cho văn bản chính đảm bảo độ tương phản (ví dụ: #2D2526)." },
                    accent: { type: Type.STRING, description: "Mã màu Hex điểm xuyết nổi bật nhẹ nhàng (ví dụ: #D4A373)." },
                  },
                },
                visualElement: {
                  type: Type.STRING,
                  description: "Đề xuất hình ảnh minh họa màu nước, trừu tượng hay cổ điển tinh tế.",
                },
                fontPairing: {
                  type: Type.OBJECT,
                  required: ["displayFont", "bodyFont"],
                  properties: {
                    displayFont: {
                      type: Type.STRING,
                      description: "Tên font chữ nghệ thuật thanh lịch phù hợp tựa đề (ví dụ: 'Playfair Display', 'EB Garamond', 'Cormorant Garamond', 'Dancing Script', 'Cinzel').",
                    },
                    bodyFont: {
                      type: Type.STRING,
                      description: "Tên font chữ cho nội dung chính dễ đọc (ví dụ: 'Inter', 'EB Garamond', 'Montserrat', 'Merriweather').",
                    },
                  },
                },
              },
            },
            closingThought: {
              type: Type.STRING,
              description: "Thông điệp kết thúc truyền cảm hứng, nuôi dưỡng ngọn lửa sáng tác tiếp theo.",
            },
            questions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "MỘT hoặc HAI câu hỏi gợi mở tinh tế giúp người dùng đào sâu thêm ý tưởng và cảm xúc.",
            },
          },
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Không nhận được phản hồi từ Nàng Thơ.");
    }

    const parsedResponse = JSON.parse(text.trim());
    res.json(parsedResponse);
  } catch (error: any) {
    console.error("Gemini API error:", error);
    res.status(500).json({
      error: "Đã xảy ra lỗi khi kết nối với Nàng Thơ Kỹ Thuật Số. Vui lòng thử lại sau.",
      details: error.message,
    });
  }
});

// Configure Vite or production static files serving
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start();
