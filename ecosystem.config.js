module.exports = {
  apps: [
    {
      name: "api-server",
      script: "./dist/server.bundle.js", // build qilingan API server fayli
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "300M",
      env: {
        NODE_ENV: "production",
      },
    },
    {
      name: "cdn-server",
      script: "./dist/cdn.bundle.js", // build qilingan CDN server fayli
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "300M",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
