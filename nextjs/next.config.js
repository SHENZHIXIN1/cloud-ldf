module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/ldf',
        destination: `${process.env.API_BASE_URL}/api/ldf`,
      },
    ];
  },
};
