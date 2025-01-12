/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'requirements': '#BBE6FC',
        'development': '#B5EAD7',
        'testing': '#E2BEF1',
        'cicd': '#FFD3B6',
        'success': '#2ECC71',
        'error': '#E74C3C',
        'accent': '#5D6CC0',
        'border': '#2C3E50',
        'diamond': '#F39C12'
      }
    }
  },
  plugins: [require('flowbite/plugin')]
}

