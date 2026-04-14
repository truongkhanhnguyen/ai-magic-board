---
title: "AI Magic Board Implementation Plan"
status: "pending"
blockedBy: []
blocks: []
---

# Kế hoạch Triển khai (Implementation Plan): AI Magic Board

## 1. Mô tả Bài toán (Problem Statement)
Giáo viên Tiếng Anh thiếu một công cụ trình chiếu chuyên biệt để kiểm tra ngữ pháp (Reported Speech, v.v.) bằng trí tuệ nhân tạo (AI) trong bối cảnh học sinh không có thiết bị điện thoại, chỉ dùng bảng con ở dưới lớp học. Các công cụ hiện tại tốn nhiều thao tác chuyển đổi cửa sổ ứng dụng và thiếu tính tương tác đồ họa (gamification).

## 2. Giải pháp được chọn (Selected Solution)
**"AI Magic Board"** - Web App đánh giá đáp án thời gian thực qua máy chiếu.
- **YAGNI & KISS:** Không tài khoản, không Database (chỉ lưu memory/local storage), không cài đặt phức tạp. Giáo viên dán danh sách câu hỏi vào là bắt đầu game.
- **Tính năng nổi bật:** Một màn hình Game Show tối giản, nơi giáo viên gõ chép lại đáp án từ bảng con của học sinh. AI (Gemini) đóng vai trò làm trọng tài "phán xử" câu trả lời kèm theo hình ảnh động vui nhộn.

## 3. Kiến trúc & Công nghệ (Arcitecture & Tech Stack)
- **Frontend / Framework:** Next.js (App Router), React, Tailwind CSS (Xây dựng UI trình chiếu chữ to, gamification).
- **Backend / Integration:** Next.js Route Handlers để gọi bảo mật tới **Google Gemini API** (`@google/genai` hoặc fetch HTTPS).
- **State Management:** React local state.
- **Deploy:** Vercel (Miễn phí, CI/CD tự động).

## 4. Giai đoạn Triển khai (Implementation Phases)

### Phase 1: UI Generative Design (Design First)
- Sử dụng lệnh `/ck:stitch` để lên ý tưởng và tạo Nhanh Prototype giao diện trực quan cho "AI Magic Board". AI sẽ thiết kế bố cục (Layout), màu sắc và tạo ra file `DESIGN.md` cùng HTML/Tailwind mockup.
- Phê duyệt mockup, sau đó sử dụng lệnh `/ck:frontend-design` để chuyển thiết kế thô thành các **React Components** thực tế (chuẩn Responsive, Tailwind CSS) đưa vào dự án.
- Khởi tạo Next.js App (`npx create-next-app`) và tích hợp hệ thống Components tĩnh trên vào App.

### Phase 2: Logic Integration & AI Checker Engine (Cook Phase)
- Kích hoạt lệnh `/ck:cook` để bắt đầu nối logic thực tế vào giao diện tĩnh.
- Tạo Backend Endpoint (`/api/check-answer`) tiếp nhận: `<Câu gốc>, <Yêu cầu chuyển đổi>, <Đáp án của học sinh>`.
- **Prompt Engineering cốt lõi:** Viết System Prompt ép AI đóng vai "giám khảo vui tính", kiểm tra lỗi (sai tenses, sai pronoun, sai time expressions...).
- Định dạng Response JSON ép buộc AI trả về: 
  ```json
  { "isCorrect": boolean, "feedback": "Lời giải thích tiếng Việt ngắn gọn để chiếu bảng", "details": "Lỗi sai cụ thể (nếu có)" }
  ```

### Phase 3: Gamification & Animations
- Tích hợp Framer Motion để làm hiệu ứng Popup khi hiện kết quả.
- Thêm nhân vật Mascot AI tĩnh hoặc ảnh vector (Alien, Robot) đổi mầu/đổi biểu cảm dựa trên kết quả trả về (`isCorrect`: Nhảy múa đồ họa màu Xanh, `false`: Khuyên bảo màu Đỏ).
- Cài đặt âm thanh cơ bản (Correct/Wrong/Ticking). Thêm chế độ đếm ngược thời gian (Timer) cho học sinh viết bảng.

### Phase 4: PoC Testing & Deployment
- Đưa tập dữ liệu Câu 2, 6, 8, 10 trong file đề cương *"2526 - ĐỀ CƯƠNG KTĐG HKII - ANH 8"* vào chạy thử nghiệm.
- Kiểm thử các ca biên (học sinh sai chính tả nhỏ, AI có chấp nhận không?).
- Triển khai (Deploy) sản phẩm hoàn thiện lên Vercel.

## 5. Tiêu chí Đánh giá Thành công (Success Metrics)
- Luồng tạo game dưới 30 giây (copy & paste -> Play).
- Thời gian AI phản hồi (Latency) nhỏ hơn 2 giây để không làm "chết" nhịp độ lớp học.
- UI chiếu lên TV/Projector rõ chữ cách xa giới hạn 5-10 mét.
- API Key không bị lộ trên Frontend.

## 6. Lệnh Vận hành Tiếp theo (Cook Command)
Run command sau để bắt đầu triển khai Phase 1:
`/ck:cook plans/ai-magic-board/plan.md`
