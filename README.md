<div align="center">

# Student Manager

**Cross-platform student management app built with Expo, React Native, TypeScript, and a bundled local REST API.**

[![CI](https://github.com/Tuannll/student-manager-expo/actions/workflows/ci.yml/badge.svg)](https://github.com/Tuannll/student-manager-expo/actions/workflows/ci.yml)
[![Expo](https://img.shields.io/badge/Expo-54-000020?style=flat-square&logo=expo&logoColor=white)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/github/license/Tuannll/student-manager-expo?style=flat-square)](LICENSE)

**[Features](#features) • [Quick Start](#quick-start) • [API](#api) • [FAQ](#faq)**

**English** | [Tiếng Việt](README.vi.md)

</div>

---

<a id="features"></a>

## ✨ Features

| Area | Included |
| --- | --- |
| **Student list** | Load students and search by name, student ID, or email. |
| **Create** | Validate required fields, trim input, and prevent duplicate submissions. |
| **Details** | Display name, student ID, class, email, and address. |
| **Delete** | Confirm destructive actions and refresh the list after deletion. |
| **UI states** | Loading, empty, error, retry, and disabled states. |
| **Accessibility** | Accessible labels, roles, busy states, and touch targets. |
| **Local API** | Bundled `json-server` backend with sample data and API smoke tests. |

---

<a id="quick-start"></a>

## 🚀 Quick Start

**Requirements:** Node.js `>= 22`, npm, and Expo Go, Android Emulator, or iOS Simulator.

```bash
git clone https://github.com/Tuannll/student-manager-expo.git
cd student-manager-expo
npm ci
npm ci --prefix mock-backend
cp .env.example .env
```

PowerShell equivalent:

```powershell
Copy-Item .env.example .env
```

Start API in terminal 1:

```bash
npm start --prefix mock-backend
```

Start Expo in terminal 2:

```bash
npm start
```

> [!NOTE]
> The API is local development infrastructure. It has no authentication and must not be exposed as a production service.

### API URL by runtime

| Runtime | `EXPO_PUBLIC_API_URL` |
| --- | --- |
| iOS Simulator | `http://localhost:3000` |
| Android Emulator | `http://10.0.2.2:3000` |
| Physical device | `http://<BACKEND-COMPUTER-LAN-IP>:3000` |

Physical devices and backend computer must use same Wi-Fi. Restart Expo after changing `.env`.

---

<a id="api"></a>

## 🔌 API

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/students` | List students. |
| `GET` | `/students?search=<keyword>` | Search all student fields. |
| `GET` | `/students/:id` | Read one student. |
| `POST` | `/students` | Create one student. |
| `DELETE` | `/students/:id` | Delete one student. |

```json
{
  "id": "1",
  "name": "Nguyễn Văn An Bình Cường",
  "mssv": "SV001",
  "lop": "64CS1",
  "email": "an@example.com",
  "address": "Hà Nội"
}
```

Validation follows assignment constraints: name has at least 20 trimmed characters, student ID at least 5, email is required and contains `@`, address is optional.

---

## 🛠️ Commands

```bash
npm start                              # Start Expo
npm run android                        # Open Android
npm run ios                            # Open iOS Simulator on macOS
npm test                               # Run repository and validation tests
npm run typecheck                      # Check TypeScript
npm run check --prefix mock-backend    # Check backend syntax
npm run smoke --prefix mock-backend    # Exercise backend CRUD API
```

---

## 📁 Structure

```text
student-manager-expo/
├── app/                         # Expo Router screens
├── assets/                      # App icons and splash assets
├── services/                    # API client and validation
├── types/                       # Student model
├── mock-backend/                # Local JSON REST API and sample data
├── .github/workflows/ci.yml     # Automated checks
├── README.md                    # English documentation
└── README.vi.md                 # Vietnamese documentation
```

---

<a id="faq"></a>

## ❓ FAQ

**Why can the app not load students?**

Confirm backend is running, `.env` has correct URL, and firewall permits port `3000`.

**Why does Android Emulator reject `localhost`?**

Use `http://10.0.2.2:3000`; emulator `localhost` points to emulator itself.

**How do I reset sample data?**

Restore `mock-backend/db.json` from Git: `git restore mock-backend/db.json`.

**Does repository include backend?**

Yes. `mock-backend/` contains local development API and sample students.

---

## 🤝 Contributing

Create a branch, run `npm test`, `npm run typecheck`, and backend smoke test, then open a pull request.

---

## ⚠️ Disclaimer

Sample records are fictional. Local backend is for education and development only.

---

## 📄 License

Released under [MIT License](LICENSE).
