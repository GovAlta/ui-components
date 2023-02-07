import { replaceCodePlugin } from 'vite-plugin-replace';

module.exports = {
  plugins: [
    replaceCodePlugin({
      replacements: [
        {
          from: /:global\(([\[\]\(\)\-\.\:\*\w]+)\)/g,
          to: '$1',
        }
      ]
    }),
  ],
};
