module.exports = {
  globDirectory: './dist/',
  globPatterns: [
    '**/*'
  ],
  swDest: 'dist/service-worker.js',
  clientsClaim: true,
  skipWaiting: true,
  runtimeCaching: [{
    urlPattern: new RegExp('https://localhost'),
    handler: 'cacheFirst', //staleWhileRevalidate
  }]
};
