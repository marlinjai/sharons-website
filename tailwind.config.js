/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Base Brand Colors
        'brand-primary': '#c5441f',
        'brand-primary-light': '#e15023',
        'brand-white': '#FFFFFF',
        'brand-off-white': '#f7f6f2',
        'brand-gray-light': '#BCBCBC',
        'brand-gray': '#707785',
        'brand-gray-dark': '#374152',
        'brand-black': '#212121',
        'brand-off-black': '#FEFEFE',

        // Text Colors (semantic naming)
        'text-primary': '#c5441f',
        'text-light': '#FFFFFF',
        'text-dark': '#212121',
        'text-gray': '#374152',
        'text-gray-light': '#707785',
        'text-muted': '#BCBCBC',

        // Background Colors (semantic naming)
        'bg-primary': '#FFFFFF',
        'bg-secondary': '#f7f6f2',
        'bg-off-white': '#FEFEFE',
        'bg-gradient-start': '#c5441f',
        'bg-gradient-end': '#C9A89E',

        // Button Colors
        'btn-primary-bg': '#c5441f',
        'btn-primary-bg-hover': '#e15023',
        'btn-primary-text': '#FFFFFF',
        'btn-primary-text-hover': '#FFFFFF',
        'btn-secondary-bg': '#FFFFFF',
        'btn-secondary-bg-hover': '#c5441f',
        'btn-secondary-text': '#212121',
        'btn-secondary-text-hover': '#FFFFFF',

        // Navigation Colors
        'nav-text': '#212121',
        'nav-text-hover': '#c5441f',
        'nav-dropdown-bg': '#FFFFFF',
        'nav-dropdown-text': '#212121',
        'nav-dropdown-text-hover': '#c5441f',

        // Border Colors
        'border-primary': '#c5441f',
        'border-accent': '#e15023',
        'border-light': '#BCBCBC',

        // Blog Colors
        'blog-color': '#ffffff',
      },
      fontFamily: {
        sans: ['Josefin Sans', 'sans-serif'],
        heading: ['Playfair Display', 'serif'],
        playfair: ['Playfair Display', 'serif'],
        primary: ['Josefin Sans', 'sans-serif'],
        secondary: ['Playfair Display', 'serif'],
      },
      // Fluid typography - map CSS variables to Tailwind classes
      fontSize: {
        xs: 'var(--text-xs)',
        sm: 'var(--text-sm)',
        base: 'var(--text-base)',
        lg: 'var(--text-lg)',
        xl: 'var(--text-xl)',
        '2xl': 'var(--text-2xl)',
        '3xl': 'var(--text-3xl)',
        '4xl': 'var(--text-4xl)',
        '5xl': 'var(--text-5xl)',
        '6xl': 'var(--text-6xl)',
        '7xl': 'var(--text-7xl)',
        '8xl': 'var(--text-8xl)',
        '9xl': 'var(--text-9xl)',
      },
      // Map CSS variables to Tailwind utilities
      maxWidth: {
        content: 'var(--content-max-width)',
        'mobile-content': 'var(--mobile-content-max-width)',
      },
      padding: {
        content: 'var(--content-padding)',
      },
      gap: {
        'mobile-nav': 'var(--mobile-nav-gap)',
      },
      fontSize: {
        'mobile-nav': 'var(--mobile-nav-font-size)',
      },
      // Custom animations
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
};
