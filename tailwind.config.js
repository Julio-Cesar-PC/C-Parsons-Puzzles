/* eslint-disable */
module.exports = {
  content: ['./src/**/*.{vue,js,ts}'],
  theme: {
    colors: {
      code: '#828aa7',
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        dark: {
          ...require('daisyui/src/theming/themes')['dark'],
          primary: '#059669',
          secondary: '#10b981',
        },
      },
    ],
  },
}
