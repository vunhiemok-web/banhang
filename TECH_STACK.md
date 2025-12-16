# 📦 Công Nghệ & Ngôn Ngữ Cần Thiết - Bánh Tráng AI Marketer

## 🛠️ Ngôn Ngữ Lập Trình

| Ngôn ngữ | Phiên bản | Mục đích |
|----------|-----------|----------|
| **TypeScript** | ~5.8.2 | Ngôn ngữ chính cho toàn bộ logic ứng dụng |
| **HTML5** | - | Cấu trúc trang web (`index.html`) |
| **CSS3** | - | Styling với Tailwind CSS |

---

## ⚛️ Framework & Thư Viện Chính

### Frontend
| Thư viện | Phiên bản | Mục đích |
|----------|-----------|----------|
| **React** | ^19.2.3 | UI Framework chính |
| **React DOM** | ^19.2.3 | Render React lên DOM |
| **Vite** | ^6.2.0 | Build tool & Dev server |
| **TailwindCSS** | CDN | CSS Framework (sử dụng qua CDN) |

### UI Components
| Thư viện | Phiên bản | Mục đích |
|----------|-----------|----------|
| **lucide-react** | ^0.561.0 | Icons (ShoppingBag, Sparkles...) |
| **react-markdown** | ^10.1.0 | Render markdown content |

### AI/API
| Thư viện | Phiên bản | Mục đích |
|----------|-----------|----------|
| **@google/genai** | ^1.33.0 | Kết nối với Google Gemini API |

---

## 🔧 DevDependencies (Công cụ phát triển)

| Thư viện | Phiên bản | Mục đích |
|----------|-----------|----------|
| **@vitejs/plugin-react** | ^5.0.0 | Vite plugin cho React |
| **@types/node** | ^22.14.0 | TypeScript types cho Node.js |
| **typescript** | ~5.8.2 | TypeScript compiler |

---

## 🌐 CDN & External Resources

| Nguồn | URL | Mục đích |
|-------|-----|----------|
| **TailwindCSS** | `https://cdn.tailwindcss.com` | CSS Framework |
| **Google Fonts** | `https://fonts.googleapis.com` | Font Nunito (400, 600, 700, 800) |
| **ESM.sh** | `https://esm.sh/` | Module CDN cho imports |

---

## 🔑 Environment Variables

| Biến | Mô tả |
|------|-------|
| `API_KEY` | Google GenAI API Key (bắt buộc) |

---

## 📁 Cấu Trúc Project

```
bánh-tráng-ai-marketer/
├── components/
│   ├── ControlPanel.tsx    # Panel tùy chỉnh tone, platform
│   ├── ProductSelector.tsx # Component chọn sản phẩm
│   └── ResultCard.tsx      # Hiển thị kết quả AI
├── services/
│   └── geminiService.ts    # Kết nối Gemini API
├── App.tsx                 # Component chính
├── index.tsx               # Entry point
├── index.html              # HTML template
├── constants.ts            # Danh sách sản phẩm
├── types.ts                # TypeScript interfaces & enums
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── vite.config.ts          # Vite config
└── .env.local              # API Key (không commit)
```

---

## 🚀 Yêu Cầu Hệ Thống

- **Node.js**: >= 18.x (khuyến nghị LTS)
- **npm**: >= 9.x hoặc **yarn**/**pnpm**
- **Trình duyệt**: Chrome, Firefox, Edge, Safari (phiên bản mới)

---

## 📝 Lệnh Khởi Chạy

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build production
npm run build

# Preview production build
npm run preview
```

---

## 🎨 Design System

### Màu sắc Brand (Orange)
```
brand-50:  #fff7ed
brand-100: #ffedd5
brand-200: #fed7aa
brand-300: #fdba74
brand-400: #fb923c
brand-500: #f97316 (Primary)
brand-600: #ea580c
brand-700: #c2410c
brand-800: #9a3412
brand-900: #7c2d12
```

### Font
- **Primary**: Nunito (Google Fonts)
- **Weights**: 400 (Regular), 600 (Semi-bold), 700 (Bold), 800 (Extra-bold)

---

## 🌍 APIs Sử Dụng

| API | Model | Mục đích |
|-----|-------|----------|
| **Google GenAI** | `gemini-2.5-flash` | Tạo nội dung marketing bằng AI |

---

*Cập nhật lần cuối: 15/12/2025*
