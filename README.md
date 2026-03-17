# Gerthela Restaurant Website - MVP

A modern, responsive restaurant website for Gerthela Taverna in Saranda, Albania. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

### Public Website
- ✅ Hero section with call-to-action
- ✅ About section with restaurant story
- ✅ Dynamic menu management with categories
- ✅ Photo gallery with lightbox viewer
- ✅ Guest reviews from multiple platforms
- ✅ Contact form and Google Maps integration
- ✅ Mobile-responsive design
- ✅ Links to external review platforms (TripAdvisor, Google, Restaurant Guru)
- ✅ Instagram integration

### Admin Panel
- ✅ Secure login with password
- ✅ Menu item management (Add/Edit/Delete)
- ✅ Restaurant information updates
- ✅ Announcement/news management
- ✅ Responsive dashboard UI

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Database**: Supabase (optional - can add later)
- **State**: Zustand (optional - for future features)
- **HTTP**: Axios

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone or extract the project
```bash
cd gerthela-restaurant
npm install
```

2. Configure environment variables
```bash
# Copy example env file
cp .env.local.example .env.local
```

For MVP, you only need:
```
ADMIN_PASSWORD=demo123
```

3. Start the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### Admin Panel Access

1. Navigate to [http://localhost:3000/admin](http://localhost:3000/admin)
2. Enter password: `demo123` (configured in .env.local)
3. Manage menu, restaurant info, and announcements

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── admin/login/         # Admin authentication
│   ├── admin/
│   │   ├── page.tsx              # Login page
│   │   └── dashboard/page.tsx     # Admin dashboard
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Homepage
│   └── globals.css                # Global styles
├── components/
│   ├── Header.tsx                 # Navigation
│   ├── Hero.tsx                   # Hero section
│   ├── About.tsx                  # About section
│   ├── Menu.tsx                   # Menu display
│   ├── Gallery.tsx                # Photo gallery
│   ├── Reviews.tsx                # Reviews section
│   ├── Contact.tsx                # Contact form & map
│   ├── Footer.tsx                 # Footer
│   └── admin/
│       ├── MenuManagement.tsx      # Menu CRUD
│       ├── RestaurantInfoManagement.tsx
│       └── AnnouncementManagement.tsx
├── types/
│   └── index.ts                   # TypeScript types
└── lib/
    └── supabase.ts                # Supabase client (optional)
```

## Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Next Steps (Phase 2)

To enhance the MVP further:

1. **Database Integration**
   - Set up Supabase project
   - Create tables for menu items, restaurant info, announcements
   - Connect admin panel to real data

2. **Image Management**
   - Integrate Cloudinary for image uploads
   - Update gallery with dynamic images from database

3. **Email Integration**
   - Connect contact form to email service (SendGrid, Resend)
   - Send admin notifications for new inquiries

4. **Additional Features**
   - SEO optimization and sitemap
   - Analytics integration
   - Multi-language support (Albanian, Italian, English)
   - Online booking system (future phase)

5. **Deployment**
   - Deploy to Vercel (recommended for Next.js)
   - Set up custom domain (gerthela.al)
   - Configure DNS and SSL

## Current Limitations (MVP)

- ⚠️ Admin data stored in browser (localStorage) - resets on refresh
- ⚠️ No image upload - using placeholder images
- ⚠️ No email notifications
- ⚠️ No database persistence
- ⚠️ No multi-language support
- ⚠️ No booking system

## Demo Credentials

- **Admin Password**: `demo123`
- **Location**: Saranda, Albania (39.8731°N, 20.0050°E)

## Contact & Support

- 📞 **Phone**: +355 68 666 0000
- 💬 **WhatsApp**: +355 69 621 5643
- 🌍 **Website**: gerthela.al
- 📸 **Instagram**: @gerthela_

## License

MIT License - Free to use and modify

---

Created with ❤️ for Gerthela Taverna
