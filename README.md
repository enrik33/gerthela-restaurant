# Gerthela Taverna — Official Website

The official website for **Gerthela Taverna**, a traditional Albanian restaurant nestled in the heart of Saranda, Albania. Built with a modern tech stack to deliver a fast, elegant, and fully responsive experience for guests worldwide.

---

## Overview

This is a full-featured restaurant website offering visitors a seamless way to explore the menu, browse the gallery, read guest reviews, and get in touch — all in multiple languages. An integrated admin panel allows restaurant staff to manage content without any technical knowledge.

---

## Features

### Public Website
- **Hero Section** — Striking landing experience with call-to-action
- **About** — The story and atmosphere of Gerthela Taverna
- **Menu** — Full menu display with categories and item details
- **Photo Gallery** — Curated gallery with lightbox viewer
- **Reviews** — Aggregated guest reviews from TripAdvisor, Google, and Restaurant Guru
- **Contact** — Contact form and embedded Google Maps
- **Multi-language Support** — Albanian, English, and Italian (via i18n)
- **Fully Responsive** — Optimised for mobile, tablet, and desktop

### Admin Panel
- **Secure Authentication** — Password-protected admin login
- **Menu Management** — Add, edit, and delete menu items and categories
- **Restaurant Info** — Update hours, contact details, and descriptions
- **Announcements** — Publish news and special offers
- **Responsive Dashboard** — Manage content from any device

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| State Management | Zustand |
| Database | Supabase |
| Icons | Lucide React |
| HTTP | Axios |
| i18n | Custom i18n with locale routing |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/enrik33/gerthela-restaurant.git
cd gerthela-restaurant
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
ADMIN_PASSWORD=your_secure_password
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## Project Structure

```
src/
├── app/
│   ├── api/admin/login/          # Admin authentication endpoint
│   ├── admin/
│   │   ├── page.tsx              # Admin login page
│   │   └── dashboard/page.tsx    # Admin dashboard
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   └── globals.css               # Global styles
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Menu.tsx
│   ├── Gallery.tsx
│   ├── Reviews.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── LanguageSwitcher.tsx
│   ├── GoogleTranslateWidget.tsx
│   └── admin/
│       ├── MenuManagement.tsx
│       ├── RestaurantInfoManagement.tsx
│       └── AnnouncementManagement.tsx
├── i18n/                         # Internationalisation configuration
├── hooks/                        # Custom React hooks
├── store/                        # Zustand state stores
├── types/                        # TypeScript type definitions
└── lib/
    └── supabase.ts               # Supabase client
```

---

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run translate    # Generate translation files
```

---

## Deployment

This project is optimised for deployment on **Vercel**.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push the repository to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard
4. Deploy — Vercel handles the rest

---

## Contact

- 📞 **Phone**: +355 68 666 0000
- 💬 **WhatsApp**: +355 68 666 0000
- 📸 **Instagram**: [@gerthela_](https://instagram.com/gerthela_)
- 📍 **Location**: Saranda, Albania

---

## License

MIT License — Free to use and modify.

---
