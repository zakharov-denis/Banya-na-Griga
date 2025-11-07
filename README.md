# Banya Haven - Русская Баня в Калининграде

Premium Russian Banya website built with React, TypeScript, and Tailwind CSS.

## 🚀 Tech Stack

- **Frontend Framework:** React 18+ with TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** Motion (Framer Motion)
- **UI Components:** shadcn/ui + Radix UI
- **Icons:** Lucide React
- **Form Handling:** React Hook Form
- **Build Tool:** Vite
- **Notifications:** Sonner

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 18.0.0 or higher
- **npm** 9.0.0 or higher (or yarn/pnpm)

## 🛠️ Installation

1. **Clone or extract the project:**
```bash
cd saunaproject
```

2. **Install dependencies:**
```bash
npm install
```

## 🏃‍♂️ Development

Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:3000`

## 🏗️ Building for Production

Create a production build:
```bash
npm run build
```

The optimized files will be in the `dist/` directory.

Preview the production build:
```bash
npm run preview
```

## 📦 Deployment

### Deploy to Firebase Hosting

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase (if not already done):
```bash
firebase init hosting
```

4. Build and deploy:
```bash
npm run build
firebase deploy --only hosting
```

For detailed deployment instructions, see `docs/FIREBASE_DEPLOYMENT_REVIEW.md`

## 📁 Project Structure

```
saunaproject/
├── src/                    # Source files
│   ├── App.tsx            # Main App component
│   └── main.tsx           # React entry point
├── components/            # React components
│   ├── ui/               # Reusable UI components (shadcn/ui)
│   ├── booking/          # Booking widget components
│   ├── vacancies/        # Vacancies page components
│   └── ...
├── styles/               # Global styles
│   └── globals.css       # Tailwind and custom CSS
├── docs/                 # Documentation
├── scripts/              # Utility scripts
├── index.html            # HTML entry point
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## 🎨 Key Features

- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Russian language support with optimized Cyrillic fonts
- ✅ Interactive booking widget
- ✅ Event packages and pricing pages
- ✅ Gallery with auto-scroll
- ✅ Customer reviews and testimonials
- ✅ FAQ section
- ✅ Contact form with Google Maps integration
- ✅ Cookie consent system
- ✅ Legal documents (Privacy Policy, Terms of Service)
- ✅ Blog/News section
- ✅ Vacancies/Careers page
- ✅ Premium animations and transitions

## 🔧 Customization

### Update Content
- Edit component files in `/components/` to update text and content
- Modify `/styles/globals.css` for design token changes

### Update Images
- Replace image URLs in components with your own hosted images
- Update logo URL in components

### Update Colors
- Edit color values in `/styles/globals.css` under CSS custom properties
- Main brand colors: `#D4A574` (gold), `#7A5C47` (brown), `#FAF7F2` (cream)

### Add/Modify Sections
- Create new components in `/components/`
- Import and add to `/src/App.tsx`

## 📧 Contact & Support

For questions or support regarding this project, please contact the development team.

## 📄 License

This project is proprietary and confidential. All rights reserved by Banya Haven.

---

**Built with ❤️ for Banya Haven**

