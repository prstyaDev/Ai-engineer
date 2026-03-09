# prstyaDev Portfolio

Portfolio personal untuk AI Engineer & Fullstack Developer yang dibangun dengan Next.js, React, dan Tailwind CSS.

## 🚀 Fitur

- **Home Page** - Hero section dengan intro dan highlight projects
- **Projects** - Showcase project AI/ML dengan tag teknologi
- **Blog** - Artikel teknis tentang AI, Machine Learning, dan pengembangan
- **Playground** - Interaktif AI playground untuk testing model
- **Contact** - Form kontak dengan MongoDB storage
- **AI Integration** - Mendukung OpenAI SDK untuk fitur AI

## 🛠️ Tech Stack

| Teknologi | Deskripsi |
|-----------|-----------|
| [Next.js 16](https://nextjs.org/) | React framework dengan App Router |
| [React 19](https://react.dev/) | UI library |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first CSS framework |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript |
| [Prisma](https://www.prisma.io/) | ORM untuk MongoDB |
| [Bun](https://bun.sh/) | Package manager & runtime |

## 📋 Prerequisites

- Node.js 20+
- Bun (disarankan) atau npm

## ⚡ Cara Install

```bash
# Clone repository
git clone
https://github.com/prstyaDev/AI-Engineer-Portfolio.git
cd AI-Engineer-Portfolio

# Install dependencies (Bun)
bun install

# Install dependencies (npm)
npm install
```

## ▶️ Cara Menjalankan

```bash
# Development server
bun run dev
# atau
npm run dev

# Build production
bun run build
# atau
npm run build

# Start production server
bun start
# atau
npm start
```

## 📁 Struktur Proyek

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   ├── globals.css       # Global styles
│   ├── blog/             # Blog pages
│   │   ├── page.tsx      # Blog list
│   │   └── [slug]/       # Blog post dynamic route
│   ├── projects/         # Projects page
│   ├── playground/       # AI Playground
│   ├── contact/          # Contact form
│   └── api/              # API routes
│       ├── ai/           # AI endpoints
│       └── contact/      # Contact form API
├── components/           # React components
│   ├── layout/          # Header, Footer
│   ├── sections/        # Hero, ProjectsGrid
│   └── ui/              # Button, Card, Input, etc.
├── lib/                  # Utilities
│   ├── db.ts           # Prisma client
│   ├── mdx.ts          # MDX utilities
│   └── utils.ts        # Helper functions
├── config/              # Configuration
│   └── projects.ts     # Project data
└── types/               # TypeScript types
```

## 🔧 Environment Variables

Buat file `.env.local` untuk konfigurasi:

```env
# MongoDB Connection
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/database"

# OpenAI API Key (untuk fitur AI)
OPENAI_API_KEY="sk-..."

# Next.js
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## 📝 Available Scripts

| Command | Deskripsi |
|---------|-----------|
| `bun run dev` | Start development server |
| `bun run build` | Build production app |
| `bun run start` | Start production server |
| `bun run lint` | Run ESLint |
| `bun run typecheck` | TypeScript checking |

## 🤝 Kontribusi

1. Fork repository ini
2. Buat feature branch (`git checkout -b feature/ nama-fitur`)
3. Commit perubahan (`git commit -m 'Add some feature'`)
4. Push ke branch (`git push origin feature/nama-fitur`)
5. Open Pull Request

## 📄 Lisensi

MIT License - lihat file [LICENSE](LICENSE) untuk detail.

---

Dibuat dengan ❤️ menggunakan Next.js & Tailwind CSS
