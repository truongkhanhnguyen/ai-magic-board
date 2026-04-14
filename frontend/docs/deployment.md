# Deployment Strategy cho AI Magic Board

Ứng dụng của chúng ta hiện tại là một **Next.js Full-stack App** (có cả Frontend UI và Backend API route `/api/check`). Dựa trên kiến trúc này, dưới đây là phương án Deploy tối ưu nhất về mặt chi phí và hiệu năng.

## Đề xuất nền tảng: Vercel (Best Choice)
Vercel chính là "mẹ đẻ" của khung làm việc Next.js, nên việc đưa ứng dụng này lên Vercel là mượt mà nhất, cấu hình bằng 0 (Zero-config).
- **Chi phí:** Gói Hobby hoàn toàn **Miễn phí 100%**.
- **Tính năng:** Cung cấp sẵn HTTPS, CI/CD tự động, băng thông 100GB/tháng (quá dư dả cho lớp học).

---

## 🔥 Các bước thực hiện Deploy

### Cách 1: Triển khai nhanh bằng Vercel CLI (Ngay trên máy hiện tại)
Đây là cách nhanh nhất không cần thông qua Github.
1. Tại thư mục `frontend`, mở Terminal và chạy lệnh:
   ```bash
   npx vercel
   ```
2. Nếu chưa đăng nhập, CLI sẽ yêu cầu bạn đăng nhập bằng Github/Google.
3. Liên tục bấm `Enter` để chọn các thiết lập mặc định (nó sẽ tự nhận diện đây là Next.js).
4. Khi chạy xong, Vercel sẽ ghim cho bạn một link preview.
5. **Cực kỳ quan trọng:** Bạn phải lên trang quản trị [vercel.com](https://vercel.com/dashboard) -> Chọn Project AI Magic Board -> Chuyển sang tab **Settings** -> **Environment Variables** -> Thêm các tham số sau vào y hệt file `.env`:
   - `GEMINI_API_KEY` = `[Mã của bạn]`
   - `OPENROUTER_API_KEY` = `[Mã của bạn]`
   - `OPENROUTER_MODEL` = `openrouter/free`
6. Deploy lại lần cuối bằng lệnh:
   ```bash
   npx vercel --prod
   ```

### Cách 2: Triển khai chuẩn chỉ qua Github (Khuyên dùng về lâu dài)
1. Tạo một Repository mới trên Github.
2. Push toàn bộ thư mục `engSLIDE` (hoặc riêng thư mục `frontend`) lên repo đó.
3. Truy cập [Vercel](https://vercel.com/), chọn **Add New Project**.
4. Import Repository vừa tạo.
5. Tại mục **Environment Variables** trước khi bấm Deploy, điền đầy đủ 3 Key môi trường nói trên.
6. Bấm **Deploy**. Về sau, cứ mỗi lần bạn sửa code và gõ lệnh `git push`, Vercel sẽ tự cập nhật trang web (CI/CD tự động).

---

### Cần hỗ trợ?
Nếu bạn đã cài sẵn `Git` trên máy, tôi có thể thao tác phụ bạn Cách 1 (Deploy ngay dưới local) bằng dòng lệnh. Bạn chọn lộ trình nào?
