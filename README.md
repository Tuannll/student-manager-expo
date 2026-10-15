<div align="center">

# Student Manager

**Ứng dụng React Native quản lý sinh viên, chạy bằng Expo và backend local.**

[![Expo](https://img.shields.io/badge/Expo-54-000020?style=flat-square&logo=expo&logoColor=white)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Axios](https://img.shields.io/badge/Axios-1.17-5A29E4?style=flat-square&logo=axios&logoColor=white)](https://axios-http.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

**[Tính năng](#tính-năng) • [Cài đặt](#cài-đặt) • [Backend local](#backend-local) • [API](#api) • [FAQ](#faq)**

</div>

---

<a id="tính-năng"></a>

## ✨ Tính năng

| Nhóm | Chi tiết |
| --- | --- |
| **Danh sách** | Tải, hiển thị và tìm kiếm sinh viên theo backend API. |
| **Thêm mới** | Validate tên, MSSV, email; chặn gửi form trùng. |
| **Chi tiết** | Hiển thị đầy đủ tên, MSSV, lớp, email, địa chỉ. |
| **Xóa** | Có xác nhận, loading state và tự tải lại danh sách. |
| **Trạng thái UI** | Loading, empty state, lỗi kết nối và retry. |
| **Accessibility** | Label, role và disabled state cho action chính. |

---

<a id="cài-đặt"></a>

## 🚀 Cài đặt

**Yêu cầu:** Node.js `>= 22`, Expo Go cho thiết bị thật, Android Emulator hoặc iOS Simulator, backend tương thích chạy local.

```bash
git clone https://github.com/Tuannll/student-manager.git
cd student-manager
npm install
```

Tạo file `.env` từ mẫu:

```bash
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Chạy app:

```bash
npm start
```

> [!NOTE]
> `.env` không được commit. Mỗi máy tự cấu hình `EXPO_PUBLIC_API_URL` cho backend local.

---

<a id="backend-local"></a>

## 🖥️ Backend local

Backend phải chạy trước khi mở app và cung cấp API ở port `3000` hoặc port bạn cấu hình.

```env
EXPO_PUBLIC_API_URL=http://localhost:3000
```

| Môi trường chạy app | Giá trị `EXPO_PUBLIC_API_URL` |
| --- | --- |
| iOS Simulator | `http://localhost:3000` |
| Android Emulator | `http://10.0.2.2:3000` |
| Điện thoại thật | `http://<IP-LAN-MÁY-CHẠY-BACKEND>:3000` |

Ví dụ điện thoại thật:

```env
EXPO_PUBLIC_API_URL=http://192.168.1.10:3000
```

Điện thoại và máy chạy backend phải **cùng Wi-Fi**. Cho phép backend qua Windows Firewall nếu app không kết nối được.

Sau khi đổi `.env`, dừng Expo rồi chạy lại `npm start` để Expo đọc URL mới.

---

<a id="api"></a>

## 🔌 API

Backend local cần cung cấp JSON contract sau:

| Method | Endpoint | Mục đích |
| --- | --- | --- |
| `GET` | `/students` | Lấy toàn bộ danh sách sinh viên. |
| `GET` | `/students?search=<keyword>` | Tìm kiếm sinh viên. |
| `GET` | `/students/:id` | Lấy chi tiết một sinh viên. |
| `POST` | `/students` | Tạo sinh viên mới. |
| `DELETE` | `/students/:id` | Xóa sinh viên. |

Dữ liệu sinh viên:

```json
{
  "id": "1",
  "name": "Nguyễn Văn An",
  "mssv": "12345",
  "lop": "64CS",
  "email": "an@example.com",
  "address": "Hà Nội"
}
```

`lop` và `address` có thể bỏ trống. Backend tạo `id` khi xử lý `POST`.

---

## 🛠️ Lệnh

```bash
npm start          # Mở Expo development server
npm run android    # Mở Android
npm run ios        # Mở iOS Simulator trên macOS
npm test           # Chạy config, README và validation tests
npm run typecheck  # Kiểm tra TypeScript
```

---

## 📁 Cấu trúc dự án

```text
student-manager/
├── app/                         # Expo Router screens
│   ├── _layout.tsx               # Stack navigation
│   ├── index.tsx                 # List và search
│   ├── add.tsx                   # Create form
│   └── detail/[id].tsx           # Detail và delete
├── assets/                       # App icon, splash, favicon
├── services/
│   ├── api.ts                    # Axios API boundary
│   └── studentValidation.ts       # Pure client validation
├── types/index.ts                # Student type
├── app.config.js                 # Expo config + API URL bridge
├── .env.example                  # Local backend URL sample
└── appConfig.test.mjs            # Expo config test
```

---

<a id="faq"></a>

## ❓ FAQ

**App báo không tải được danh sách?**  
Kiểm tra backend đang chạy, URL trong `.env`, và firewall. Thiết bị thật không dùng `localhost`.

**Android Emulator không gọi được backend?**  
Dùng `http://10.0.2.2:3000`, không dùng `http://localhost:3000`.

**Tại sao thay `.env` nhưng app vẫn dùng URL cũ?**  
Dừng Expo, sau đó chạy lại `npm start`.

**Có backend trong repo này không?**  
Không. Đây là mobile client. Bạn cần chạy backend tương thích riêng.

---

## 🤝 Đóng góp

Fork repository, tạo branch, chạy `npm test` và `npm run typecheck`, rồi mở pull request.

---

## ⚠️ Lưu ý

Repository phục vụ chạy với backend local. Không chứa dữ liệu production, token, API key, hoặc backend public.

---

## 📄 License

Phát hành theo [MIT License](LICENSE).
