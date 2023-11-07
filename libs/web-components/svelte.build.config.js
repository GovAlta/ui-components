import { replaceCodePlugin } from 'vite-plugin-replace';

module.exports = {
  plugins: [
    replaceCodePlugin({
      replacements: [
        {
          from: /:global\(([\[\]\(\)\-\.\:\*\w]+)\)/g,
          to: "$1",
        },
        {
          from: /\(--container-mobile\)/g,
          to: "(max-width: 623px)"
        },
        {
          from: /\(--container-not-mobile\)/g,
          to: "(min-width: 624px)",
        },
        {
          from: /\(--container-tablet\)/,
          to: "(min-width: 624px) and (max-width: 1023px)",
        },
        {
          from: /\(--container-not-tablet\)/,
          to: "(max-width: 623px) or (min-width: 1024px)",
        },
        {
          from: /\(--container-desktop\)/,
          to: "(min-width: 1024px)",
        },
        {
          from: /\(--container-not-desktop\)/,
          to: "(max-width: 1023px)",
        },
      ],
    }),
  ],
};

