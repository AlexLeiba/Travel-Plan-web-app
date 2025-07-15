import type { Config } from 'tailwindcss';

const config = {
  // overwrite the default headings and p font size
  // If we just wanted to add new classes, we could use->>> extend object
  theme: {
    screens: {
      lg: '1024px',
      md: {
        min: '576px',
        max: '1023px',
      },
      sm: {
        min: '0px',
        max: '575px',
      },
    },
    colors: {
      black: 'red',
    },

    fontSize: {
      // HEADINGS
      // h1
      '9xl': ['40px', { fontWeight: 500 }],
      // h1 mobile
      '7xl': ['48px', { fontWeight: 500 }],

      // h2
      '8xl': ['44px', { fontWeight: 500 }],

      // h2 mobile
      '6xl': ['32px', { fontWeight: 500 }],

      //h5
      '2xl': ['24px', { fontWeight: 500 }],

      //   PARAGRAPHS
      xl: ['20px', { fontWeight: 400 }],
      base: ['16px', { fontWeight: 400 }],
      s: ['14px', { fontWeight: 400 }],
    },
  },
} satisfies Config;

export default config;
