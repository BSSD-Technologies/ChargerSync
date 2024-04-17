// next.config.js
module.exports = {
    webpack: (config) => {
      config.module.rules.push({
        test: /\.md$/,
        use: 'raw-loader', // Use 'markdown-loader' if you want to parse markdown into HTML
      });
      return config;
    },
  };
  