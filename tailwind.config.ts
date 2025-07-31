import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dreamy Pastels
        'blush-pink': '#f9c5d1',
        'baby-pink': '#ffcfe0',
        'cotton-candy': '#fdaae6',
        'peachy': '#ffb3ab',
        'sweet-lavender': '#d6b4fc',
        'sugar-violet': '#e5d1ff',
        'bubblegum': '#ff8ad4',
        'buttercup': '#ffe6a7',
        'mint-cream': '#d4fff9',
        'sky-angel': '#d0e5ff',

        // Brighter Accents
        'girly-fuchsia': '#ff66cc',
        'girly-rose': '#ff99aa',
        'girly-purple': '#c084fc',
        'girly-blue': '#8ecae6',
        'girly-yellow': '#ffe066',

        // Neutrals
        'girly-white': '#fffafa',
        'girly-gray': '#f5f5f5',
        'girly-shadow': '#e0d4f7',
      },
      fontFamily: {
        mono: [
          'Cascadia Code',
          'Fira Code',
          'Courier New',
          'monospace',
        ],
        fancy: ['"Comic Neue"', '"Patrick Hand"', '"Handlee"', 'cursive'],
        dreamy: ['"Poppins"', '"Quicksand"', '"Nunito"', 'sans-serif'],
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        glitter: 'glitter 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-100% 0' },
          '100%': { backgroundPosition: '100% 0' },
        },
        glitter: {
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
      },
      backgroundImage: {
        'hearts-pattern': "url('/hearts.svg')",
        'stars-pattern': "url('/stars.svg')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'glittery-grid': 'linear-gradient(rgba(255,192,203,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,192,203,0.1) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '20px 20px',
      },
    },
  },
  plugins: [],
}

export default config
