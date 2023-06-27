module.exports = {
    // ...
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules\/ethers\/lib.esm\/providers\/provider-browser.js/,
          use: {
            loader: 'babel-loader',
            options: {
              // Babel options...
            },
          },
        },
      ],
    },
    // ...
  };
  