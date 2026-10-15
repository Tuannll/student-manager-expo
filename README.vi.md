<div align="center">

# Student Manager

**Ứng dụng quản lý sinh viên đa nền tảng bằng Expo, React Native, TypeScript và REST API local đi kèm.**

[![CI](https://github.com/Tuannll/student-manager-expo/actions/workflows/ci.yml/badge.svg)](https://github.com/Tuannll/student-manager-expo/actions/workflows/ci.yml)
[![Expo](https://img.shields.io/badge/Expo-54-000020?style=flat-square&logo=expo&logoColor=white)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/github/license/Tuannll/student-manager-expo?style=flat-square)](LICENSE)

**[Tính năng](#tinh-nang) • [Chạy nhanh](#chay-nhanh) • [API](#api) • [FAQ](#faq)**

[English](README.md) | **Tiếng Việt**

</div>

---

<a id="tinh-nang"></a>

## ✨ Tính năng

| Nhóm | Nội dung |
| --- | --- |
| **Danh sách** | Tải và tìm kiếm sinh viên theo tên, MSSV hoặc email. |
| **Thêm mới** | Validate dữ liệu, trim input và chặn gửi trùng. |
| **Chi tiết** | Hiển thị tên, MSSV, lớp, email và địa chỉ. |
| **Xóa** | Xác nhận thao tác và tự tải lại danh sách. |
| **Trạng thái UI** | Loading, empty, lỗi, retry và disabled state. |
| **Accessibility** | Label, role, busy state và touch target. |
| **API local** | `json-server`, dữ liệu mẫu và smoke test CRUD đi kèm. |

---

<a id="chay-nhanh"></a>

## 🚀 Chạy nhanh

**Yêu cầu:** Node.js `>= 22`, npm và Expo Go, Android Emulator hoặc iOS Simulator.

```bash
git clone https://github.com/Tuannll/student-manager-expo.git
cd student-manager-expo
npm ci
npm ci --prefix mock-backend
cp .env.example .env
```

PowerShell:

```powershell
Copy-Item .env.example .env
```

Terminal 1 chạy API:

```bash
npm start --prefix mock-backend
```

Terminal 2 chạy Expo:

```bash
npm start
```

> [!NOTE]
> API local chỉ phục vụ phát triển. API không có xác thực và không phù hợp production.

### URL API theo môi trường

| Môi trường | `EXPO_PUBLIC_API_URL` |
| --- | --- |
| iOS Simulator | `http://localhost:3000` |
| Android Emulator | `http://10.0.2.2:3000` |
| Điện thoại thật | `http://<IP-LAN-MÁY-CHẠY-BACKEND>:3000` |

Điện thoại và máy chạy backend phải cùng Wi-Fi. Khởi động lại Expo sau khi sửa `.env`.

---

<a id="api"></a>

## 🔌 API

| Method | Endpoint | Mục đích |
| --- | --- | --- |
| `GET` | `/students` | Lấy danh sách. |
| `GET` | `/students?search=<keyword>` | Tìm kiếm toàn bộ trường. |
| `GET` | `/students/:id` | Lấy chi tiết. |
| `POST` | `/students` | Tạo sinh viên. |
| `DELETE` | `/students/:id` | Xóa sinh viên. |

Ràng buộc: tên tối thiểu 20 ký tự sau trim, MSSV tối thiểu 5 ký tự, email bắt buộc có `@`, địa chỉ không bắt buộc.

---

## 🛠️ Lệnh

```bash
npm start                              # Chạy Expo
npm run android                        # Mở Android
npm run ios                            # Mở iOS Simulator trên macOS
npm test                               # Chạy test repository và validation
npm run typecheck                      # Kiểm tra TypeScript
npm run check --prefix mock-backend    # Kiểm tra cú pháp backend
npm run smoke --prefix mock-backend    # Kiểm tra CRUD API
```

---

## 📁 Cấu trúc

```text
student-manager-expo/
├── app/                         # Màn hình Expo Router
├── assets/                      # Icon và splash
├── services/                    # API client và validation
├── types/                       # Model Student
├── mock-backend/                # REST API local và dữ liệu mẫu
├── .github/workflows/ci.yml     # Kiểm tra tự động
├── README.md                    # Tài liệu tiếng Anh
└── README.vi.md                 # Tài liệu tiếng Việt
```

---

<a id="faq"></a>

## ❓ FAQ

**App không tải được danh sách?**

Kiểm tra backend, URL trong `.env` và firewall cho port `3000`.

**Android Emulator không gọi được `localhost`?**

Dùng `http://10.0.2.2:3000` vì emulator có localhost riêng.

**Khôi phục dữ liệu mẫu thế nào?**

Chạy `git restore mock-backend/db.json`.

**Repo có backend không?**

Có. `mock-backend/` chứa API phát triển và dữ liệu mẫu.

---

## 🤝 Đóng góp

Tạo branch, chạy test, typecheck và backend smoke test trước khi mở pull request.

---

## ⚠️ Lưu ý

Dữ liệu mẫu là hư cấu. Backend local chỉ phục vụ học tập và phát triển.

---

## 📄 License

Phát hành theo [MIT License](LICENSE).
