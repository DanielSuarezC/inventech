/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#0A8FE0',
          green: '#3CAE43',
          navy: '#0B1F33',
          gray: '#5B6472',
        },
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        card: '12px',
        control: '8px',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(11, 31, 51, 0.08), 0 1px 2px -1px rgba(11, 31, 51, 0.08)',
        elevated: '0 10px 25px -5px rgba(11, 31, 51, 0.15), 0 8px 10px -6px rgba(11, 31, 51, 0.1)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #0A8FE0 0%, #3CAE43 100%)',
      },
    },
  },
  plugins: [],
};
