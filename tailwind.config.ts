import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#040404',
        surface: '#0A0A0A',
        primary: '#ffffff',
        secondary: '#a1a1aa',
        'acid-green': '#39FF14',
        'electric-violet': '#8A2BE2',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'border-beam': 'border-beam 3s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'flicker': 'flicker 3s infinite alternate',
      },
      keyframes: {
        'border-beam': {
          '100%': { transform: 'rotate(360deg)' },
        },
        'shimmer': {
          from: { backgroundPosition: '200% 0' },
          to: { backgroundPosition: '-200% 0' },
        },
        'flicker': {
          '0%, 100%': { opacity: '1', textShadow: '0 0 10px #8A2BE2, 0 0 20px #8A2BE2' },
          '92%': { opacity: '1', textShadow: '0 0 10px #8A2BE2, 0 0 20px #8A2BE2' },
          '93%': { opacity: '0.4', textShadow: '0 0 2px #8A2BE2' },
          '94%': { opacity: '1', textShadow: '0 0 10px #8A2BE2, 0 0 20px #8A2BE2' },
          '96%': { opacity: '0.8', textShadow: '0 0 5px #8A2BE2' },
          '98%': { opacity: '1', textShadow: '0 0 10px #8A2BE2, 0 0 20px #8A2BE2' },
          '99%': { opacity: '0.3', textShadow: 'none' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
