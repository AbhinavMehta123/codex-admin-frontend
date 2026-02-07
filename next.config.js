/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination:
          process.env.NODE_ENV === 'production'
            ? 'https://codex-admin.onrender.com/api/:path*' // Render backend
            : 'http://localhost:5000/api/:path*',           // Local backend
      },
    ];
  },
};

module.exports = nextConfig;
