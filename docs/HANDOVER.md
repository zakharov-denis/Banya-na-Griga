# 👨‍💻 Developer Handover Documentation - Banya Haven

Complete guide for developers taking over this project.

## 📖 Project Overview

**Project Name:** Banya Haven - Russian Banya Website  
**Location:** Kaliningrad, Russia  
**Language:** Russian (Cyrillic)  
**Purpose:** Premium spa/banya booking and information website

## 🎯 Project Goals

- Provide information about Russian banya services
- Enable online booking through widget
- Showcase gallery, reviews, and pricing
- Support corporate event bookings
- Display vacancies and company information

## 🛠️ Tech Stack

### Core Technologies
- **React 18.3+** - UI framework
- **TypeScript 5.6+** - Type safety
- **Vite 6** - Build tool and dev server
- **Tailwind CSS v4** - Styling framework

### Key Libraries
- **Motion (Framer Motion)** - Animations (`motion/react`)
- **Lucide React** - Icon system
- **shadcn/ui** - Component library (in `/components/ui/`)
- **Radix UI** - Headless UI primitives
- **React Hook Form 7.55** - Form handling
- **date-fns** - Date manipulation
- **Sonner** - Toast notifications

## 📁 Project Structure

```
/
├── components/               # All React components
│   ├── ui/                  # shadcn/ui reusable components
│   │   ├── button.tsx       # Button component
│   │   ├── dialog.tsx       # Modal component
│   │   ├── calendar.tsx     # Date picker
│   │   ├── tubelight-navbar.tsx  # Custom navbar with glow effect
│   │   └── ...              # Other UI components
│   ├── booking/             # Booking widget modules
│   │   ├── BookingWidget.tsx     # Main booking modal
│   │   ├── SaunaSelection.tsx    # Step 1: Choose sauna type
│   │   ├── DateSelection.tsx     # Step 2: Pick date
│   │   ├── TimeSelection.tsx     # Step 3: Pick time
│   │   ├── BookingSummary.tsx    # Step 4: Review & confirm
│   │   └── ConfirmationScreen.tsx # Success screen
│   ├── vacancies/           # Careers page components
│   ├── about/               # About page components
│   ├── figma/               # Figma-specific utilities
│   │   └── ImageWithFallback.tsx # Image component with fallback
│   ├── Header.tsx           # Site header/navigation
│   ├── Hero.tsx             # Landing hero section
│   ├── Services.tsx         # Services showcase
│   ├── EventPackagesSection.tsx  # Corporate events
│   ├── GallerySection.tsx   # Photo gallery with auto-scroll
│   ├── TestimonialsSection.tsx   # Customer reviews
│   ├── PricingPage.tsx      # Dedicated pricing page
│   ├── BlogsPage.tsx        # News/articles page
│   ├── VacanciesPage.tsx    # Careers page
│   ├── AboutUsPage.tsx      # About/story page
│   ├── ContactSection.tsx   # Contact with Google Maps
│   ├── Footer.tsx           # Site footer
│   ├── CookieConsent.tsx    # Cookie banner
│   └── LegalDocuments.tsx   # Privacy/Terms modal
├── styles/
│   └── globals.css          # Global styles, Tailwind, design tokens
├── index.html               # HTML entry point
├── main.tsx                 # React entry point
├── App.tsx                  # Main app component with routing
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript config
├── package.json             # Dependencies
└── README.md                # General documentation
```

## 🎨 Design System

### Color Palette
```css
/* Brand Colors */
--color-primary: #D4A574;      /* Gold */
--color-secondary: #C69563;    /* Darker gold */
--color-brown: #7A5C47;        /* Brown text */
--color-dark: #3D3226;         /* Dark text */
--color-cream: #FAF7F2;        /* Background cream */
--color-beige: #F5E6D3;        /* Light beige */
--color-border: #E8DFD5;       /* Border color */
```

### Typography
- **System font stack** optimized for Cyrillic
- **Font smoothing** enabled for better rendering
- **No Tailwind font classes** - uses CSS custom properties
- Defined in `/styles/globals.css`

### Spacing & Layout
- Uses Tailwind's spacing scale
- Generous padding for premium feel
- Rounded corners (`rounded-2xl`, `rounded-3xl`)
- Soft shadows for depth

## 🔧 Key Features & Implementation

### 1. Navigation System
**File:** `/components/ui/tubelight-navbar.tsx`

- Fixed header with backdrop blur
- Desktop: Text navigation with "tubelight" glow effect
- Tablet: Icon navigation
- Mobile: Hamburger menu with slide-down
- Smooth scroll to sections
- Active state tracking

**Customization:**
```typescript
// Edit navigation items in Header.tsx
const navItems = [
  { name: 'Главная', url: '#home', icon: HomeIcon },
  { name: 'Услуги', url: '#services', icon: Package },
  // Add more items
];
```

### 2. Booking Widget
**Files:** `/components/booking/*`

**Flow:**
1. Select sauna type (Traditional/Finnish/Infrared)
2. Pick date (calendar with blocked dates)
3. Choose time slot
4. Review summary
5. Submit booking

**State Management:**
- All state in `BookingWidget.tsx`
- Uses `useState` for wizard steps
- Form validation with `react-hook-form`

**Customization:**
```typescript
// Edit sauna options in SaunaSelection.tsx
const saunas = [
  {
    id: 'traditional',
    name: 'Традиционная',
    price: '2500₽/час',
    // ...
  }
];

// Edit time slots in TimeSelection.tsx
const timeSlots = [
  { id: '10:00', label: '10:00', available: true },
  // ...
];
```

### 3. Routing System
**File:** `/App.tsx`

**Pages:**
- Home (default)
- Pricing (`/pricing`)
- Blogs (`/blogs`)
- Vacancies (`/vacancies`)
- About Us (`/about`)

**Implementation:**
```typescript
const [currentPage, setCurrentPage] = useState<'home' | 'vacancies' | 'about-us' | 'pricing' | 'blogs'>('home');

// Navigate
setCurrentPage('pricing');
```

**Note:** Uses client-side state, not React Router. To upgrade to React Router:
1. `npm install react-router-dom`
2. Replace state-based routing with `<BrowserRouter>` and `<Routes>`

### 4. Gallery with Auto-Scroll
**File:** `/components/GallerySection.tsx`

- Auto-scrolling image carousel
- Click to open full-screen modal
- Image lazy loading optimization
- Uses `embla-carousel-react`

### 5. Form Handling
**Files:** Multiple components

**Pattern:**
```typescript
import { useForm } from 'react-hook-form@7.55.0';

const { register, handleSubmit, formState: { errors } } = useForm();

const onSubmit = (data) => {
  // Handle form submission
  toast.success('Успешно отправлено!');
};
```

### 6. Cookie Consent
**File:** `/components/CookieConsent.tsx`

- Appears on first visit
- Stores consent in localStorage
- Can be customized for GDPR compliance

### 7. Legal Documents
**File:** `/components/LegalDocuments.tsx`

- Privacy Policy
- Terms of Service
- Opens in modal overlay
- Fully translated to Russian

## 🔌 Important Imports

### Motion (Framer Motion)
```typescript
import { motion } from 'motion/react';

// Use <motion.div> for animations
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
/>
```

### shadcn/ui Components
```typescript
import { Button } from './components/ui/button';
import { Dialog } from './components/ui/dialog';
import { Calendar } from './components/ui/calendar';
```

### Icons
```typescript
import { Calendar, MapPin, Phone } from 'lucide-react';
```

### React Hook Form (Specific Version)
```typescript
import { useForm } from 'react-hook-form@7.55.0';
```

## 🚨 Important Notes

### 1. Font Rendering
- **DO NOT** use Tailwind font classes (`text-xl`, `font-bold`)
- Typography is managed in `globals.css`
- Custom font stack optimized for Cyrillic
- Font smoothing enabled

### 2. Image Handling
- Use `ImageWithFallback` component for new images
- External images loaded via Unsplash
- Logo: `https://i.ibb.co/JWJ913Vb/5204071771186266480-removebg-preview.png`

### 3. State Management
- No Redux/Zustand - uses React state
- Simple prop drilling for small data
- Consider adding Context API if app grows

### 4. API Integration
**Currently:** No backend - all data is hardcoded

**To add backend:**
1. Create API service layer
2. Replace hardcoded data with API calls
3. Add environment variables for API URLs
4. Handle loading/error states

Example:
```typescript
// services/api.ts
export async function bookSauna(data: BookingData) {
  const response = await fetch('/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}
```

## 🎯 Development Workflow

### Running Locally
```bash
npm install      # Install dependencies
npm run dev      # Start dev server (localhost:3000)
npm run build    # Build for production
npm run preview  # Preview production build
```

### Making Changes

1. **Edit existing component:**
   - Find component in `/components/`
   - Make changes
   - Save (hot reload will update)

2. **Add new section:**
   ```typescript
   // components/NewSection.tsx
   export function NewSection() {
     return <div>New Content</div>;
   }
   
   // App.tsx
   import { NewSection } from './components/NewSection';
   // Add <NewSection /> where needed
   ```

3. **Modify styles:**
   - Edit component's className attributes
   - Or modify `/styles/globals.css` for global changes

### Code Style
- Use TypeScript strict mode
- Prefer functional components
- Use explicit types for props
- Keep components small and focused

## 🔍 Common Tasks

### Update Text Content
Find component → Edit JSX strings directly

### Change Colors
Edit in `/styles/globals.css` or inline Tailwind classes

### Add New Page
1. Create page component in `/components/`
2. Add to `currentPage` type in `App.tsx`
3. Add navigation handler
4. Add conditional render

### Modify Booking Flow
Edit components in `/components/booking/`

### Update Navigation
Edit `navItems` in `/components/Header.tsx`

### Change Logo
Update URL in `/components/ui/tubelight-navbar.tsx` and `index.html`

## 🐛 Known Issues & Limitations

### 1. No Backend
- Bookings not saved
- Forms don't actually submit
- No user authentication

### 2. No Routing Library
- Uses state-based "routing"
- No URL changes on navigation
- No browser back/forward support
- **Solution:** Integrate React Router

### 3. No Data Persistence
- All data resets on refresh
- Cookie consent in localStorage only
- **Solution:** Add backend + database

### 4. Hardcoded Content
- All text in components
- **Solution:** Use CMS or i18n system

### 5. Image Loading
- External images may load slowly
- **Solution:** Host images on CDN

## 📝 Future Improvements

### Priority 1: Essential
- [ ] Integrate backend API for bookings
- [ ] Add React Router for proper routing
- [ ] Set up database for storing bookings
- [ ] Email notification system
- [ ] Payment integration (Stripe/Yandex.Money)

### Priority 2: Enhanced UX
- [ ] User authentication/accounts
- [ ] Booking history dashboard
- [ ] Multi-language support (add English)
- [ ] CMS integration for content management
- [ ] Image optimization and CDN

### Priority 3: Nice to Have
- [ ] Progressive Web App (PWA)
- [ ] Dark mode
- [ ] Social media integration
- [ ] Live chat support
- [ ] Analytics dashboard

## 🔐 Security Considerations

### Before Production:
- [ ] Add input sanitization
- [ ] Implement rate limiting on forms
- [ ] Add CSRF protection
- [ ] Validate all user inputs on backend
- [ ] Use HTTPS only
- [ ] Add Content Security Policy headers
- [ ] Implement proper error handling (don't expose errors to users)

## 📞 Support & Questions

### Documentation Files:
- `README.md` - General overview and setup
- `DEPLOYMENT.md` - Deployment instructions
- `HANDOVER.md` - This file (developer guide)

### Useful Resources:
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Motion Docs](https://motion.dev)
- [Vite Docs](https://vitejs.dev)

## ✅ Handover Checklist

- [ ] Clone/receive project files
- [ ] Run `npm install` successfully
- [ ] Start dev server with `npm run dev`
- [ ] Review all pages and functionality
- [ ] Understand routing system
- [ ] Test booking widget flow
- [ ] Check responsive design on mobile
- [ ] Read through key components
- [ ] Understand design system
- [ ] Review this documentation
- [ ] Set up version control (Git)
- [ ] Plan first improvements

---

**Welcome to the Banya Haven project! If you have questions, refer to this document first. Good luck! 🎉**
