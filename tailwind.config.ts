import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#28221D',
        counter: '#3A2E23',
        parchment: '#FAF5E9',
        'parchment-alt': '#F1E6CC',
        jam: '#6B2737',
        butter: '#E8B94A',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'serif'],
        body: ['var(--font-public-sans)', 'sans-serif'],
      },
      spacing: {
        'section-y': '96px',
        'section-y-mobile': '48px',
      },
      maxWidth: {
        'content': '1280px',
      },
      animation: {
        'fade-in': 'fadeIn 400ms cubic-bezier(0.16,1,0.3,1) forwards',
        'slide-up': 'slideUp 400ms cubic-bezier(0.16,1,0.3,1) forwards',
        'scale-in': 'scaleIn 300ms cubic-bezier(0.16,1,0.3,1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      transitionTimingFunction: {
        'custom': 'cubic-bezier(0.16,1,0.3,1)',
      },
    },
  },
  plugins: [],
}
export default config