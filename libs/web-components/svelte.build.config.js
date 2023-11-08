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
          from: /\(--mobile\)/g,
          to: "(max-width: 623px)"
        },
        {
          from: /\(--not-mobile\)/g,
          to: "(min-width: 624px)",
        },
        {
          from: /\(--tablet\)/,
          to: "(min-width: 624px) and (max-width: 1023px)",
        },
        {
          from: /\(--not-tablet\)/,
          to: "(max-width: 623px) or (min-width: 1024px)",
        },
        {
          from: /\(--desktop\)/,
          to: "(min-width: 1024px)",
        },
        {
          from: /\(--not-desktop\)/,
          to: "(max-width: 1023px)",
        },
      ],
    }),
  ],
};

