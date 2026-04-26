# Student Dashboard

Complete student dashboard module containing all pages, components, and styles for the ESISA platform.

## Directory Structure

```
student-dashboard/
├── pages/
│   ├── StudentDashboard.jsx          # Main dashboard entry point
│   ├── DashboardOverview.tsx          # Overview/home tab
│   ├── DashboardLearning.tsx          # Learning modules & progression
│   ├── OpportunitiesPage.tsx          # Job opportunities & filtering
│   ├── CVLettersPage.tsx              # CV management & templates
│   ├── SettingsPage.tsx               # User settings & preferences
│   └── README.md
│
├── components/
│   ├── cv/                            # CV-related components
│   ├── offers/                        # Job offers components
│   ├── profile/                       # Profile components
│   └── README.md
│
├── styles/
│   ├── StudentDashboard.css           # Main dashboard styles
│   └── README.md
│
└── README.md                          # This file
```

## Quick Start

### Import & Use

```jsx
import StudentDashboard from '@/student-dashboard/pages/StudentDashboard';
import DashboardOverview from '@/student-dashboard/pages/DashboardOverview';
```

### CSS

Import the main stylesheet in your application:

```jsx
import '@/student-dashboard/styles/StudentDashboard.css';
```

## Pages

### StudentDashboard.jsx
Main dashboard layout with sidebar navigation and dynamic tab rendering.

### DashboardOverview.tsx
Overview page showing:
- Statistics cards (global score, matched jobs, streak, rank)
- Recent activity feed
- Job listings
- Dark mode toggle

### DashboardLearning.tsx
Learning modules page showing:
- Learning modules with progress bars
- Skill levels
- Module status (completed/in-progress/locked)

### OpportunitiesPage.tsx
Job opportunities page with:
- Job listing with filters
- Search functionality
- Match percentage display
- Job metadata (location, salary)

### CVLettersPage.tsx
CV management page with:
- CV document list
- AI score display
- Download & preview options
- Letter templates

### SettingsPage.tsx
Settings page with:
- Profile settings
- Theme preferences
- Language selection
- Notification preferences

## Components

### Components Directory

Organized sub-directories for reusable components:
- **cv/** - CV preview, upload, management components
- **offers/** - Job cards, filters, search components
- **profile/** - Avatar, user info, mini profile components

## Styles

### CSS Classes

Main CSS classes used throughout:
- `.dash-root` - Root container
- `.dash-sidebar` - Navigation sidebar
- `.dash-main` - Main content area
- `.dash-stat-card` - Statistics cards
- `.dash-job-card` - Job listing cards
- `.dash-module-card` - Learning modules
- `.dash-activity-*` - Activity feed items

### Theme Support

All components support light/dark theme via `data-theme="dark"` attribute.

## Features

✅ Responsive design
✅ Dark mode support
✅ Framer Motion animations
✅ French/English localization ready
✅ TypeScript support (pages)
✅ Tailwind CSS compatible
✅ lucide-react icons

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Dependencies

- React 18+
- framer-motion
- lucide-react
- react-router-dom

## Notes

- Some pages use TypeScript (`.tsx`) while main dashboard uses JSX
- All components use Tailwind-compatible class naming
- CSS custom properties available: `--font-body`, `--font-display`
