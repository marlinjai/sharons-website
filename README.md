# Yoga Studio Website Clone

A modern, responsive yoga studio website built with Next.js, TypeScript, and Tailwind CSS. This project is a clone of the original yoga studio website, featuring beautiful design, smooth animations, and comprehensive functionality.

## Features

- **Responsive Design**: Works perfectly on all devices (mobile, tablet, desktop)
- **Modern UI/UX**: Clean, minimalist design with yoga-inspired color palette
- **Interactive Components**: 
  - Dynamic navigation with smooth scrolling
  - Interactive class timetable with day selection
  - Contact forms with state management
  - Newsletter subscription
- **Comprehensive Sections**:
  - Hero section with call-to-action
  - Yoga sessions overview (5 different types)
  - Expert instructors profiles
  - Client testimonials and reviews
  - Visual gallery
  - Pricing plans (3 tiers)
  - Weekly class timetable
  - Contact form and newsletter

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Custom SVG icons
- **Fonts**: Inter (body text) + Playfair Display (headings)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd yoga-studio-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles with Tailwind
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main page
├── components/
│   ├── Header.tsx           # Navigation header
│   ├── Hero.tsx             # Hero section
│   ├── YogaSessions.tsx     # Yoga sessions overview
│   ├── Instructors.tsx      # Instructors profiles
│   ├── Reviews.tsx          # Client testimonials
│   ├── Gallery.tsx          # Visual gallery
│   ├── Pricing.tsx          # Pricing plans
│   ├── Timetable.tsx        # Class schedule
│   ├── Contact.tsx          # Contact form
│   └── Footer.tsx           # Footer
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## Component Features

### Header
- Fixed navigation with smooth scrolling
- Mobile-responsive hamburger menu
- Clean, minimal design

### Hero Section
- Eye-catching headline with gradient text
- Call-to-action button
- Grid of placeholder images

### Yoga Sessions
- 5 different yoga types with descriptions
- Card-based layout with hover effects
- Responsive grid system

### Instructors
- 5 instructor profiles with experience
- Avatar placeholders with initials
- Specialty lists for each instructor

### Reviews
- Client testimonials with star ratings
- Avatar placeholders
- Responsive card layout

### Gallery
- Visual showcase section
- Placeholder images with gradients
- Responsive grid layout

### Pricing
- 3 subscription tiers
- Popular plan highlighting
- Feature lists for each plan

### Timetable
- Interactive day selection
- Weekly class schedules
- Instructor and time information

### Contact
- Contact form with validation
- Newsletter subscription
- Form state management

## Customization

### Colors
The website uses a custom yoga-inspired color palette defined in `tailwind.config.js`:

- **yoga-sand**: `#f5f3f0` (light background)
- **yoga-earth**: `#8b7355` (brown accent)
- **yoga-sage**: `#9caf88` (green primary)
- **yoga-ocean**: `#7fb3d3` (blue accent)

### Fonts
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Components
Each component is modular and can be easily customized or reused. The design follows consistent patterns for:
- Spacing and layout
- Typography hierarchy
- Color usage
- Hover effects and transitions

## Testing the Website

To test all features:

1. **Navigation**: Click on menu items to scroll to sections
2. **Mobile**: Resize browser to test responsive design
3. **Timetable**: Click different days to see schedule changes
4. **Forms**: Try submitting contact form and newsletter
5. **Hover Effects**: Hover over cards and buttons

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is created for educational purposes as a website clone.

---

**Note**: This is a front-end clone with placeholder content. For a production website, you would need to integrate:
- Backend API for form submissions
- Content Management System (CMS)
- Real images and content
- Payment processing for memberships
- User authentication and booking system 