/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
const config = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,css}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Be Vietnam Pro', 'Inter', ...defaultTheme.fontFamily.sans]
            },
            screens: {
                '-md': { max: '767px' },
                '-sm': { max: '639px' },
                '-lg': { max: '1023px' },
                '-xs': { max: '400px' }
            },
            colors: {
                tan: '#D2B48C',
                taupe: '#483C32'
            }
        }
    },
    plugins: []
};

export default config;
