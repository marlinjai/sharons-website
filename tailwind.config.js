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
        primary: '#c5441f',
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
