import path from 'path'

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@settings': path.resolve(__dirname, 'src/shared/settings'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@types': path.resolve(__dirname, 'src/shared/types'),
      '@fetchers': path.resolve(__dirname, 'src/shared/api/fetchers'),
      '@queries': path.resolve(__dirname, 'src/shared/api/queries'),
      '@urls': path.resolve(__dirname, 'src/shared/api/urls'),
    },
  },
}
