// babel.config.js
module.exports = {
    presets: [
      'next/babel',
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: ['last 2 versions', 'ie >= 11'],
          },
          modules: false,
        },
      ],
    ],
    plugins: [
      '@babel/plugin-transform-runtime',
      '@babel/plugin-proposal-optional-chaining', // Suporte para optional chaining (?.)
      '@babel/plugin-proposal-nullish-coalescing-operator', // Suporte para nullish coalescing (??)
    ],
  };
  