/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#050505',
          900: '#0a0a0b',
          850: '#0f0f11',
          800: '#141417',
          700: '#1c1c20',
          600: '#26262b',
          500: '#3a3a41',
        },
        chalk: {
          DEFAULT: '#f4f2ef',
          dim: '#a5a3a0',
          faint: '#6b6a68',
        },
        aurora: {
          pink: '#ff5fa2',
          magenta: '#c74bff',
          violet: '#7b5cff',
          blue: '#3d8bff',
          peach: '#ffc8a2',
          mint: '#8ef0c0',
        },
        // Live scroll accent, rewritten on :root by SectionThemeProvider.
        accent: {
          a: 'var(--accent-a)',
          b: 'var(--accent-b)',
        },
      },
      fontFamily: {
        sans: ['Inter', '"IBM Plex Sans Arabic"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: [
          '"JetBrains Mono"',
          '"IBM Plex Sans Arabic"',
          'ui-monospace',
          'SFMono-Regular',
          'monospace',
        ],
      },
      letterSpacing: {
        tightest: '-0.055em',
      },
      maxWidth: {
        shell: '1360px',
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '33%': { transform: 'translate3d(4%, -6%, 0) scale(1.12)' },
          '66%': { transform: 'translate3d(-5%, 4%, 0) scale(0.94)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        shimmer: {
          from: { backgroundPosition: '200% 0' },
          to: { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        drift: 'drift 26s ease-in-out infinite',
        marquee: 'marquee 42s linear infinite',
        shimmer: 'shimmer 6s linear infinite',
      },
    },
  },
  plugins: [],
};
