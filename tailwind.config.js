/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'dark-blue': '#334253',
        'grayish-blue': '#67727E',
        'light-gray': '#E9EBF0',
        'light-grayish-blue': '#C5C6EF',
        'moderate-blue': '#5357B6',
        'soft-red': '#ED6368',
        'pale-red': '#FFB8BB',
        'very-light-gray': '#F5F6FA',
      }
    },
  },
  plugins: [],
}
