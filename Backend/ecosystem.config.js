module.exports = {
  apps: [
    {
      name: 'aescion-api',
      script: 'dist/src/main.js',
      cwd: './',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      error_file: './logs/api-error.log',
      out_file: './logs/api-out.log',
      merge_logs: true,
    },
    {
      name: 'aescion-website',
      script: 'npm',
      args: 'run start',
      cwd: '../Frontend/website',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      error_file: './logs/website-error.log',
      out_file: './logs/website-out.log',
      merge_logs: true,
    }
  ],
};
