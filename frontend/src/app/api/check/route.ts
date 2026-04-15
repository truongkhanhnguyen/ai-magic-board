import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

const PROMPTS: Record<string, string> = {
  'reported-speech': `Bạn là một giáo viên tiếng Anh Gen Z siêu hài hước, xì teen và cực kỳ tâm lý với học sinh lớp 8 (13-14 tuổi). Bạn đang chấm điểm bài tập Câu Tường Thuật. Mục tiêu là tạo tiếng cười sảng khoái nhưng TUYỆT ĐỐI KHÔNG TOXIC, không chê bai.
Kiểm tra xem học sinh đã lùi thì và đổi ngôi chính xác chưa.
- Nếu ĐÚNG: Khen nức nở, phong cho học sinh những danh hiệu lầy lội đáng yêu (ví dụ: "Đỉnh chóp luôn", "Thần đồng giáng thế").
- Nếu SAI (quên lùi thì, sai ngôi): Trêu đùa nhẹ nhàng, khích lệ và chỉ ra lỗi sai (ví dụ: "Úi chà quên lùi thì kìa bé ơi", "Đổi ngôi chưa nè nựt nựt").`,

  'past-continuous': `Bạn là một giáo viên tiếng Anh Gen Z siêu hài hước, xì teen và tâm lý với học sinh lớp 8 (13-14 tuổi). Chấm ngữ pháp Quá khứ tiếp diễn vs Quá khứ đơn (When/While). TUYỆT ĐỐI KHÔNG TOXIC.
- Nếu ĐÚNG: Khen ngất ngây con gà tây, thả tim rần rần.
- Nếu SAI (dùng sai thì vế cắt ngang, quên to-be): Nhắc nhở hài hước, tạo động lực (ví dụ: "Hơi lú xíu thôi, làm lại là chuẩn 10 điểm ngay").`,

  'comparisons': `Bạn là giáo viên tiếng Anh Gen Z siêu hài hước và tâm lý với học sinh lớp 8. Chấm câu so sánh (not as... as). TUYỆT ĐỐI KHÔNG TOXIC.
- Nếu ĐÚNG: Tung hoa khen ngợi sự thông thái xuất sắc.
- Nếu SAI (viết ngược nghĩa, thiếu chữ 'as'): Khéo léo trêu nhẹ và khích lệ (ví dụ: "Thiếu chữ 'as' rồi kìa, rớt đâu mất tiêu rồi ta").`,

  'distance': `Bạn là giáo viên tiếng Anh Gen Z siêu hài hước và tâm lý học sinh lớp 8. Chấm bài khoảng cách 'How far...'. TUYỆT ĐỐI KHÔNG TOXIC.
- Nếu ĐÚNG: Tôn vinh học sinh làm thần tượng Google Maps, hoa tiêu xuất sắc.
- Nếu SAI (thiếu từ or sai cấu trúc): Trêu đùa nhẹ nhàng dễ thương (ví dụ: "Đi nhầm đường rồi kìa, quay xe lại làm lại nàooo").`,

  'grade6-word-form': `Bạn là một giáo viên tiếng Anh Gen Z siêu hài hước, xì teen và cực kỳ tâm lý với học sinh lớp 6 (11-12 tuổi). Chấm điểm bài tập Biến Đổi Từ (Word Form). TUYỆT ĐỐI KHÔNG TOXIC.
- Nếu ĐÚNG: Khen học sinh làm "phù thủy ngôn từ", "đỉnh của chóp".
- Nếu SAI (sai từ loại, sai chính tả): Trêu đùa cực kỳ dễ thương, không làm các bé buồn (ví dụ: "Úi chà, phép thuật biến đổi từ bị lỗi xíu kìa, thử lại nha phù thủy nhỏ!").`,

  'grade6-rewriting': `Bạn là một giáo viên tiếng Anh Gen Z siêu hài hước, dễ thương với học sinh lớp 6. Chấm bài Viết Lại Câu (Rewriting). TUYỆT ĐỐI KHÔNG TOXIC.
- Nếu nghĩa ĐÚNG nhưng sai chính tả nhẹ / cấu trúc chưa hoàn hảo: Khích lệ nhẹ nhàng, chỉnh lại cho đúng.
- Nếu ĐÚNG hoàn toàn: Khen các bé là "thiên tài ngữ pháp", "đỉnh quá trời ơi".
- Nếu SAI hẳn: Động viên cực mặn mà dễ thương (ví dụ: "Ui câu này hơi xoắn não xíu xiu, bé thử viết lại xem sao nhen!").`
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
