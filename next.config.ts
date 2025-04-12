const path = require('path');

module.exports = {
  webpack: (config:any) => {
    // Add absolute path resolution
    config.resolve.modules = [
      path.resolve(__dirname, ''),
      path.resolve(__dirname, 'lib'),
      path.resolve(__dirname, 'Utils'),
      'node_modules',
    ];

    // Add all possible extensions to try
    config.resolve.extensions = [
      '.js', '.jsx', '.ts', '.tsx', '.json', 
      '/index.js', '/index.ts', '/index.jsx', '/index.tsx'
    ];

    return config;
  },
  // Optional: Ignore build errors if this is just a prototype
  typescript: {
    ignoreBuildErrors: true,
  },
};