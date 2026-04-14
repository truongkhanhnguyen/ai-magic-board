import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

const PROMPTS: Record<string, string> = {
  'reported-speech': `Bạn là một giáo viên tiếng Anh Gen Z siêu lầy lội, cực kỳ hài hước và hay cà khịa. Bạn đang chấm điểm bài tập Câu Tường Thuật.
Kiểm tra xem học sinh đã lùi thì và đổi ngôi (pronouns) chính xác chưa.
- Nếu ĐÚNG: Khen nức nở, tâng bốc học sinh lên tận mây xanh bằng từ lóng mặn mòi.
- Nếu SAI (quên lùi thì, sai ngôi): Cà khịa thật hài hước, đau điếng nhưng đáng yêu, chỉ ra đúng lỗi (ví dụ: "Ủa alo quên lùi thì kìa bé ơi", "Đổi ngôi đi má").`,
  
  'past-continuous': `Bạn là một giáo viên tiếng Anh Gen Z siêu lầy lội và hài hước. Bạn đang chấm điểm ngữ pháp Quá khứ tiếp diễn vs Quá khứ đơn (When/While).
- Nếu ĐÚNG: Khen ngất ngây con gà tây, phong làm học sinh cưng.
- Nếu SAI (dùng sai thì vế cắt ngang, quên was/were): Cà khịa thẳng mặt sự lú lẫn của học sinh một cách hài hước.`,

  'comparisons': `Bạn là một giáo viên tiếng Anh Gen Z siêu lầy lội và hài hước. Bạn đang chấm bài viết lại câu so sánh (not as ... as).
- Nếu ĐÚNG: Tung hoa khen ngợi sự thông minh đỉnh cao.
- Nếu SAI (viết ngược nghĩa, thiếu chữ 'as'): Khịa nhẹ EQ và khả năng tư duy logic của học sinh.`,

  'distance': `Bạn là một giáo viên tiếng Anh Gen Z siêu lầy lội và hài hước. Bạn đang chấm mẫu câu hỏi khoảng cách "How far is it from...".
- Nếu ĐÚNG: Tôn vinh học sinh như chúa tể Google Maps.
- Nếu SAI (thiếu từ or sai cấu trúc): Cà khịa bệnh mù đường bẩm sinh của học sinh không hi vọng cứu chữa.`
};

export async function POST(req: Request) {
  try {
    const { topicId, originalSentence, studentAnswer } = await req.json();

    const ai = new GoogleGenAI({ 
      apiKey: process.env.GEMINI_API_KEY 
    });

    const specificPrompt = PROMPTS[topicId] || PROMPTS['reported-speech'];

    const systemInstruction = `${specificPrompt}

Câu hỏi gốc: "${originalSentence}"
Câu trả lời của học sinh: "${studentAnswer}"

- YÊU CẦU BẮT BUỘC: Nhận xét phản hồi phải 100% BẰNG TIẾNG VIỆT (không pha tiếng Anh).
- Giữ câu nhận xét CỰC KỲ NGẮN GỌN (tối đa 10-15 từ). Bắt buộc phải có Emoji hài hước.
- Chế độ: Vui vẻ, GenZ, mặn mòi.
- Không sử dụng định dạng Markdown trong JSON.

Return ONLY a JSON object in this format:
{ "isCorrect": boolean, "feedback": "Câu nhận xét hài hước 100% Tiếng Việt" }`;

    let responseText = null;
    let fallbackToOpenAI = false;
    
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: systemInstruction,
        config: {
          responseMimeType: "application/json",
          temperature: 0.9
        }
      });
      responseText = response.text;
    } catch (e) {
      console.warn("Gemini API failed or rate-limited. Falling back immediately to OpenRouter...");
      fallbackToOpenAI = true;
    }

    if (fallbackToOpenAI && process.env.OPENROUTER_API_KEY) {
      try {
        const openRouterModel = process.env.OPENROUTER_MODEL || "google/gemini-2.5-flash:free";
        const openAiRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "HTTP-Referer": "http://localhost:3000",
            "X-Title": "AI Magic Board"
          },
          body: JSON.stringify({
            model: openRouterModel, // Mặc định dùng model miễn phí của Google hoặc model set trong .env
            messages: [{ role: "system", content: systemInstruction }],
            response_format: { type: "json_object" },
            temperature: 0.9
          })
        });
        if (openAiRes.ok) {
          const openAiData = await openAiRes.json();
          responseText = openAiData.choices[0].message.content;
        } else {
          throw new Error("OpenRouter API error: " + await openAiRes.text());
        }
      } catch (fallbackError) {
        console.error("OpenRouter Fallback failed:", fallbackError);
        throw fallbackError;
      }
    } else if (fallbackToOpenAI) {
      throw new Error("Gemini API failed and no OPENROUTER_API_KEY provided.");
    }

    const parsed = JSON.parse(responseText || '{}');
    return NextResponse.json(parsed);

  } catch (error: any) {
    console.error('Gemini API Error:', error);
    // Trả về 200 để Frontend không quăng lỗi exception
    return NextResponse.json({ 
      isCorrect: false, 
      feedback: "Mạng lag rồi, check lại WiFi đi chời ơi! 🔌😅" 
    }, { status: 200 });
  }
}
