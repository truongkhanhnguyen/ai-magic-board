# Project Memory: AI Magic Board ✨

## 🎯 Core Directives
- **Workspace:** `C:\Users\busin\OneDrive\Desktop\engSLIDE` (Tất cả tài nguyên giới hạn trong thư mục này).
- **Design System:** "The Neon Observatory" (Pro Max Level) - Không dùng viền nét cứng (border 1px), lạm dụng `backdrop-filter: blur`, lưới đổi màu `mesh-gradient`, text cỡ siêu bự chuẩn UX cho màn chiếu.
- **Architecture:** Next.js (App Router) tối giản (KISS), không cần Database. Endpoint server-side bảo mật API key của Gemini.

## 📈 Progress Log

### ✅ Phase 1: Generative Design & Gamification
- Khởi tạo thành công `DESIGN.md` và mã hóa thành `PresentationView.tsx`.
- Gắn hệ thống điều hướng (Top Bar Control) cho giáo viên (Questions selection, Prev/Next).
- Hệ thống UI tương tác đỉnh cao:
  - Bắn **Confetti** vật lý 3D khi làm đúng (kèm Shockwave Ring 🥳).
  - Khung hình **Shake Error** + Đỏ nháy 😱 báo hiệu học sinh sai thì/đại từ.
  - Tom & Jerry phiên bản **Robot 🤖 truy đuổi Chó Cú 🐕** vòng quanh chạy ngầm background mua vui.
- Tạo bản `magic_board_preview.html` chạy test HTML thuần độc lập.

### 🚧 Phase 2: Logic Integration & Backend Setup (Current Focus)
- [ ] Bootstrap hệ thống Next.js bao bọc quanh thư mục `frontend/src`.
- [ ] Tạo endpoint `app/api/check/route.ts` kết nối với `@google/genai`.
- [ ] System Prompt Engineering cho Gemini để đánh giá chính tả câu "Reported Speech".
- [ ] Ráp Frontend call API và lấy JSON (`isCorrect`, `feedback`) hiển thị ra.

### ⏳ Phase 3: PoC Testing
- [ ] Chạy thử bộ dữ liệu Câu 2, 6, 8, 10 trong đề cương HKII Tiếng Anh 8.

## 🔐 Environment variables
- GEMINI_API_KEY: \`AQ.Ab8RN6Ls... (đã được lưu secure trong MCP Stitch)\`
