/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      aspectRatio: {
        '7/4': '7 / 4',
      },
      animation: {
        reveal: 'reveal 0.5s ease-out',
        bounce: 'bounce 0.75s infinite',
      },
      keyframes: {
        reveal: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        bounce: {
          '0%, 100%': {
            transform: 'none',
            'animation-timing-function': 'cubic-bezier(0,0,0.2,1)',
          },
          '50%': {
            transform: 'translateY(-20%)',
            'animation-timing-function': 'cubic-bezier(0.8,0,1,1)',
          },
        },
      },
      colors: {
        'text-base-1': 'rgba(var(--text-base-1))',
        'text-base-2': 'rgba(var(--text-base-2))',
        'text-base-3': 'rgba(var(--text-base-3))',
        'text-base-4': 'rgba(var(--text-base-4))',
        'text-second-1': 'rgba(var(--text-second-1))',
        'text-red-1': 'rgba(var(--text-red-1))',
        'text-red-2': 'rgba(var(--text-red-2))',
        'text-blue-1': 'rgba(var(--text-blue-1))',
        'graphic-base-1': 'rgba(var(--graphic-base-1))',
        'graphic-base-2': 'rgba(var(--graphic-base-2))',
        'graphic-base-3': 'rgba(var(--graphic-base-3))',
        'graphic-second-1': 'rgba(var(--graphic-second-1))',
        'graphic-second-2': 'rgba(var(--graphic-second-2))',
        'graphic-second-3': 'rgba(var(--graphic-second-3))',
        'graphic-second-4': 'rgba(var(--graphic-second-4))',
        'graphic-second-5': 'rgba(var(--graphic-second-5))',
        'graphic-second-6': 'rgba(var(--graphic-second-6))',
        'graphic-second-7': 'rgba(var(--graphic-second-7))',
        'graphic-second-8': 'rgba(var(--graphic-second-8))',
        'graphic-red-1': 'rgba(var(--graphic-red-1))',
        'graphic-red-2': 'rgba(var(--graphic-red-2))',
        'graphic-red-3': 'rgba(var(--graphic-red-3))',
        'graphic-red-4': 'rgba(var(--graphic-red-4))',
        'graphic-blue-1': 'rgba(var(--graphic-blue-1))',
        // "bg-1": "rgba(var(--bg-1))",
      },
      fontFamily: {
        base: 'var(--font-family-base)',
      },
      screens: {
        sm: '375px',
        lm: '414px',
        md: '744px',
        xl: '1440px',
        '3xl': '1920px',
      },
      boxShadow: {
        dropdownMenuShadow: '6px 6px 0 rgba(var(--graphic-second-6),0.05)',
      },
    },
  },
  plugins: [],
};
